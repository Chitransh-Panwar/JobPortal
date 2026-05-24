import { setAllJobs, setJobsLoading } from '@/redux/jobSlice'
import { EXTERNAL_JOB_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, includeExternalJobs } = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            dispatch(setJobsLoading(true));
            try {
                const keywordQuery = encodeURIComponent(searchedQuery || "");
                const internalRequest = axios.get(`${JOB_API_END_POINT}/get?keyword=${keywordQuery}`, { withCredentials: true });
                const externalRequest = includeExternalJobs
                    ? axios.get(
                        `${EXTERNAL_JOB_API_END_POINT}?aggregate=true&keyword=${keywordQuery}&perPage=10`,
                        { withCredentials: true }
                    )
                    : Promise.resolve({ data: { jobs: [] } });

                const [internalResult, externalResult] = await Promise.allSettled([internalRequest, externalRequest]);
                const internalJobs = internalResult.status === "fulfilled" && internalResult.value.data.success
                    ? internalResult.value.data.jobs || []
                    : [];
                const externalJobs = externalResult.status === "fulfilled"
                    ? externalResult.value?.data?.jobs || []
                    : [];

                if (internalJobs.length || externalJobs.length) {
                    dispatch(setAllJobs([...internalJobs, ...externalJobs]));
                } else {
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setJobsLoading(false));
            }
        }
        fetchAllJobs();
    },[dispatch, includeExternalJobs, searchedQuery])
}

export default useGetAllJobs
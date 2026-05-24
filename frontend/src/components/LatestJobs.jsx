import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs = [], jobsLoading} = useSelector(store=>store.job);
    let content = allJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>);

    if (jobsLoading) {
        content = <span className='text-violet-700 font-medium'>Loading jobs...</span>;
    } else if (allJobs.length <= 0) {
        content = <span>No Job Available</span>;
    }
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-3xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3 my-5'>
                {content}
            </div>
        </div>
    )
}

export default LatestJobs
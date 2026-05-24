import { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import AdminLayout from "./AdminLayout";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <AdminLayout
      title="Applications Overview"
      description="Review and shortlist candidates for this role."
      actions={
        <p className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          Applicants: {applicants?.applications?.length || 0}
        </p>
      }
    >
      <ApplicantsTable />
    </AdminLayout>
  );
};

export default Applicants;
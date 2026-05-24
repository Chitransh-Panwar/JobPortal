import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import AdminLayout from "./AdminLayout";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <AdminLayout
      title="Manage Jobs"
      description="Track posted roles and review applications."
      actions={
        <>
          <Input
            className="w-full md:w-72"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
            aria-label="Filter jobs"
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </>
      }
    >
      <AdminJobsTable />
    </AdminLayout>
  );
};

export default AdminJobs;
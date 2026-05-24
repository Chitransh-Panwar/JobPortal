import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AdminLayout from "./AdminLayout";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Post a Job" description="Create a polished job listing for top candidates.">
      <form onSubmit={submitHandler} className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">
          <h3 className="text-xl font-bold">Role Details</h3>
          <p className="mt-1 text-sm text-violet-100">Fill in the details to publish your opening.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Description</Label>
            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Requirements</Label>
            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Salary</Label>
            <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Location</Label>
            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Job Type</Label>
            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>No. of Positions</Label>
            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="mt-2" />
          </div>
          {companies.length > 0 && (
            <div className="md:col-span-2">
              <Label>Company</Label>
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="mt-2 w-full md:w-72">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {loading ? (
          <Button className="mt-6 w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="mt-6 w-full">
            Post New Job
          </Button>
        )}
        {companies.length === 0 && (
          <p className="mt-4 text-center text-xs font-bold text-red-600">
            *Please register a company first before posting a job.
          </p>
        )}
      </form>
    </AdminLayout>
  );
};

export default PostJob;
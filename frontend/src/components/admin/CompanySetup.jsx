import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import AdminLayout from "./AdminLayout";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update company.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <AdminLayout title="Company Profile" description="Keep your company profile up to date for candidates.">
      <form onSubmit={submitHandler} className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white">
          <div>
            <h3 className="text-lg font-semibold">Company Setup</h3>
            <p className="text-sm text-violet-100">Edit your branding and profile details.</p>
          </div>
          <Button type="button" onClick={() => navigate("/admin/companies")} variant="secondary" className="border-0 bg-white text-violet-700 hover:bg-violet-50">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Company Name</Label>
            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Description</Label>
            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Website</Label>
            <Input type="text" name="website" value={input.website} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div>
            <Label>Location</Label>
            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="mt-2" />
          </div>
          <div className="md:col-span-2">
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} className="mt-2" />
          </div>
        </div>
        {loading ? (
          <Button className="mt-6 w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="mt-6 w-full">
            Update Profile
          </Button>
        )}
      </form>
    </AdminLayout>
  );
};

export default CompanySetup;
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import AdminLayout from "./AdminLayout";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to create company.");
    }
  };

  return (
    <AdminLayout title="Create Company" description="Add a company profile before posting jobs.">
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">
          <h3 className="text-xl font-bold">Your Company Name</h3>
          <p className="mt-1 text-sm text-violet-100">
            What would you like to name your company? You can update this later.
          </p>
        </div>

        <div>
          <Label>Company Name</Label>
          <Input
            type="text"
            className="mt-2"
            placeholder="Name your company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompanyCreate;
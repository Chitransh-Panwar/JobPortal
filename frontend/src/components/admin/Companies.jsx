import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import AdminLayout from "./AdminLayout";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [dispatch, input]);

  return (
    <AdminLayout
      title="Companies"
      description="Create and manage your organization profiles."
      actions={
        <>
          <Input
            className="w-full md:w-72"
            placeholder="Filter by company name"
            onChange={(e) => setInput(e.target.value)}
            aria-label="Filter companies"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
        </>
      }
    >
      <CompaniesTable />
    </AdminLayout>
  );
};

export default Companies;
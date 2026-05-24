import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import oopsImg from "../assets/oops.avif";
import { Button } from "./ui/button";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setIncludeExternalJobs } from "@/redux/jobSlice";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchedQuery, jobsLoading, includeExternalJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-orange-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 pb-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Explore opportunities</h1>
          <Button
            variant={includeExternalJobs ? "default" : "outline"}
            onClick={() => dispatch(setIncludeExternalJobs(!includeExternalJobs))}
            className={includeExternalJobs ? "bg-[#6A38C2] hover:bg-[#5b30a6]" : ""}
          >
            {includeExternalJobs ? "Hide external jobs" : "Show external jobs"}
          </Button>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="lg:w-[280px]">
            <FilterCard />
          </div>
          {jobsLoading ? (
            <div className="flex-1 h-[60vh] flex items-center justify-center">
              <p className="text-lg font-medium text-violet-700">Loading jobs...</p>
            </div>
          ) : filterJobs.length <= 0 ? (
            <div className="flex-1 h-[88vh] flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <img src={oopsImg} alt="No jobs found" className="w-[320px]" />
                <p className="mt-4 text-gray-500 text-lg">No jobs found</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

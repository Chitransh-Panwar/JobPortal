import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setIncludeExternalJobs, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import oopsImg from "@/assets/oops.avif";
import { Button } from "./ui/button";
import FilterCard from "./FilterCard";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery, jobsLoading, includeExternalJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const filteredJobs = searchedQuery
    ? allJobs.filter((job) =>
      job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchedQuery.toLowerCase()),
    )
    : allJobs;

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="my-2 text-xl font-bold text-slate-900">
            Search Results ({filteredJobs.length})
          </h1>
          <Button
            variant={includeExternalJobs ? "default" : "outline"}
            onClick={() => dispatch(setIncludeExternalJobs(!includeExternalJobs))}
            className={includeExternalJobs ? "" : "border-violet-200"}
          >
            {includeExternalJobs ? "Hide external jobs" : "Show external jobs"}
          </Button>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="lg:w-[280px]">
            <FilterCard />
          </div>
          {jobsLoading ? (
            <div className="flex-1 h-[40vh] flex items-center justify-center rounded-2xl border border-violet-100 bg-white p-6">
              <p className="text-lg font-medium text-violet-700">Loading jobs...</p>
            </div>
          ) : filteredJobs.length <= 0 ? (
            <div className="flex-1 h-[60vh] flex items-center justify-center rounded-2xl border border-violet-100 bg-white p-6">
              <div className="flex flex-col items-center text-center">
                <img src={oopsImg} alt="No jobs found" className="w-[320px]" />
                <p className="mt-4 text-slate-500 text-lg">No jobs found for this filter.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 rounded-2xl border border-violet-100 bg-white p-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;

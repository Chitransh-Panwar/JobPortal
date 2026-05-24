import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setIncludeExternalJobs, setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import oopsImg from "@/assets/oops.avif";
import { Button } from "./ui/button";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs, jobsLoading, includeExternalJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-bold text-xl my-2">
          Search Results ({allJobs.length})
        </h1>
        <Button
          variant={includeExternalJobs ? "default" : "outline"}
          onClick={() => dispatch(setIncludeExternalJobs(!includeExternalJobs))}
          className={includeExternalJobs ? "bg-[#6A38C2] hover:bg-[#5b30a6]" : ""}
        >
          {includeExternalJobs ? "Hide external jobs" : "Show external jobs"}
        </Button>
        </div>
        {jobsLoading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <p className="text-lg font-medium text-violet-700">Loading jobs...</p>
          </div>
        ) : allJobs.length <= 0 ? (
          <div className="h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <img src={oopsImg} alt="No jobs found" className="w-[320px]" />
              <p className="mt-4 text-gray-500 text-lg">No jobs found</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

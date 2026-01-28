import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import oopsImg from "@/assets/oops.avif";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length <= 0 ? (
          <div className="h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <img src={oopsImg} alt="No jobs found" className="w-[320px]" />
              <p className="mt-4 text-gray-500 text-lg">No jobs found</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
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

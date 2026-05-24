import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs = [], jobsLoading } = useSelector((store) => store.job);
  let content = allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />);

  if (jobsLoading) {
    content = <span className="font-medium text-violet-700">Loading jobs...</span>;
  } else if (allJobs.length <= 0) {
    content = <span className="text-slate-500">No jobs available</span>;
  }

  return (
    <div className="mx-auto my-20 max-w-7xl px-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        <span className="text-violet-600">Latest & Top </span> Job Openings
      </h1>
      <div className="my-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content}
      </div>
    </div>
  );
};

export default LatestJobs;
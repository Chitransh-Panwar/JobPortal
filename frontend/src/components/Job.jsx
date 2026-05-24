import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = useMemo(
    () => job?.applications?.some((application) => application.applicant === user?._id) || false,
    [job?.applications, user?._id]
  );
  const [isApplied, setIsApplied] = useState(Boolean(isIntiallyApplied));

  const jobId = job?._id;
  const isExternal = Boolean(job?.isExternal);

  const applyJobHandler = async () => {
    if (isExternal) {
      if (job?.externalUrl) {
        window.open(job.externalUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }
    if (!user?._id) {
      toast.error("Please login to apply for this job.");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to apply right now.");
    }
  };

  useEffect(() => {
    setIsApplied(Boolean(isIntiallyApplied));
  }, [isIntiallyApplied]);

  return (
    <article className="group rounded-2xl border border-purple-100 bg-white/95 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon" aria-label="Save job">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location || "India"}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
        {isExternal && (
          <Badge className={"text-emerald-700 font-bold bg-emerald-100"} variant="ghost">
            External
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-4 mt-4">
        {isExternal ? (
          <Button onClick={applyJobHandler} variant="outline">
            Open Listing
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
          >
            Details
          </Button>
        )}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isExternal ? false : isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
        >
          {isExternal ? "Visit Source" : isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </article>
  );
};

export default Job;

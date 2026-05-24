import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const isExternal = Boolean(job?.isExternal);
  return (
    <div
      onClick={() => isExternal ? window.open(job?.externalUrl, "_blank", "noopener,noreferrer") : navigate(`/description/${job._id}`)}
      className="cursor-pointer rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          if (isExternal) {
            window.open(job?.externalUrl, "_blank", "noopener,noreferrer");
          } else {
            navigate(`/description/${job._id}`);
          }
        }
      }}
    >
      <div>
        <h1 className="text-lg font-medium text-slate-900">{job?.company?.name}</h1>
        <p className="text-sm text-slate-500">{job?.location || "India"}</p>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold text-slate-900">{job?.title}</h1>
        <p className="line-clamp-2 text-sm text-slate-600">{job?.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge className="bg-blue-100 font-bold text-blue-700" variant="outline">{job?.position} Positions</Badge>
        <Badge className="bg-orange-100 font-bold text-orange-700" variant="outline">{job?.jobType}</Badge>
        <Badge className="bg-violet-100 font-bold text-violet-700" variant="outline">{job?.salary}LPA</Badge>
        {isExternal && <Badge className="bg-emerald-100 font-bold text-emerald-700" variant="outline">External</Badge>}
      </div>

    </div>
  );
};

export default LatestJobCards;
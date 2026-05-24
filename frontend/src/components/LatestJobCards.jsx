import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    const isExternal = Boolean(job?.isExternal);
    return (
        <div
            onClick={() => isExternal ? window.open(job?.externalUrl, "_blank", "noopener,noreferrer") : navigate(`/description/${job._id}`)}
            className='p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 bg-white border border-purple-100 cursor-pointer'
            role='button'
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
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
                {isExternal && <Badge className={'text-emerald-700 font-bold bg-emerald-100'} variant="ghost">External</Badge>}
            </div>

        </div>
    )
}

export default LatestJobCards
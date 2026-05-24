import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to logout.");
    }
  };

  const isRecruiter = user?.role === "recruiter";

  return (
    <header role="banner" className="sticky top-0 z-50 border-b border-violet-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Job<span className="text-violet-600">Portal</span>
            </h1>
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <ul className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
              {isRecruiter ? (
                <>
                  <li><Link className="transition hover:text-violet-600" to="/admin/companies">Companies</Link></li>
                  <li><Link className="transition hover:text-violet-600" to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link className="transition hover:text-violet-600" to="/">Home</Link></li>
                  <li><Link className="transition hover:text-violet-600" to="/jobs">Jobs</Link></li>
                  <li><Link className="transition hover:text-violet-600" to="/browse">Browse</Link></li>
                </>
              )}
            </ul>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button>Get Started</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-violet-100">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="my-2 flex flex-col text-gray-600">
                      {user?.role === "student" && (
                        <div className="flex w-fit items-center gap-2">
                          <User2 />
                          <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                        </div>
                      )}
                      <div className="flex w-fit items-center gap-2">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 pb-3 text-sm font-semibold text-slate-600 md:hidden">
          {isRecruiter ? (
            <>
              <Link to="/admin/companies">Companies</Link>
              <Link to="/admin/jobs">Jobs</Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/browse">Browse</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
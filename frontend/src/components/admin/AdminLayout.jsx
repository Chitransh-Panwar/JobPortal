import { Avatar, AvatarImage } from "../ui/avatar";
import { Building2, BriefcaseBusiness, ClipboardList, LogOut, PlusCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const navItems = [
  { label: "Companies", to: "/admin/companies", icon: Building2 },
  { label: "Manage Jobs", to: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Post Job", to: "/admin/jobs/create", icon: PlusCircle },
];

const AdminLayout = ({ title, description, children, actions }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:rounded-3xl lg:bg-white lg:p-6 lg:shadow-sm lg:ring-1 lg:ring-slate-200">
          <Link to="/admin/companies" className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Job<span className="text-violet-600">Portal</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">Recruiter Workspace</p>
          </Link>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white/60">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{user?.fullname || "Recruiter"}</p>
                <p className="text-xs text-violet-100">Manage hiring faster</p>
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={logoutHandler}
              className="mt-4 w-full justify-center border-0 bg-white/95 text-violet-700 hover:bg-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>
        <main className="flex-1">
          <header className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
                  <ClipboardList className="h-3.5 w-3.5" />
                  Recruiter Dashboard
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
                {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
            </div>
          </header>
          <section className="mt-6">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

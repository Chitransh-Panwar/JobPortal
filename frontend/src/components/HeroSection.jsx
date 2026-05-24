import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "20K+", label: "Active jobs" },
  { value: "8K+", label: "Companies hiring" },
  { value: "95%", label: "Placement support" },
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="px-4">
      <div className="mx-auto mt-8 max-w-6xl rounded-[32px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-6 py-10 text-center shadow-sm md:mt-12 md:px-10 md:py-14">
        <span className="mx-auto inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 ring-1 ring-violet-100">
          #1 Career Platform for Students
        </span>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
          Build Your Future With <span className="text-violet-600">Dream Jobs</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
          Discover top opportunities, connect with trusted recruiters, and move your career forward.
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-center gap-3 md:flex-row">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Find your dream role"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              aria-label="Search jobs"
            />
            <Button onClick={searchJobHandler} className="px-4">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate("/jobs")} variant="outline" className="w-full md:w-auto">
            Browse Jobs
          </Button>
        </div>
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={searchJobHandler} className="min-w-40">Get Started</Button>
          <Button onClick={() => navigate("/signup")} variant="outline" className="min-w-40">Join as Candidate</Button>
        </div>
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
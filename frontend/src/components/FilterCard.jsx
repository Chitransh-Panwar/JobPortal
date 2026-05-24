import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "ML Engineer",
      "AI Engineer",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  const clearFilters = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [dispatch, selectedValue]);
  return (
    <aside className="w-full rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
      <h1 className="text-lg font-bold text-slate-900">Filter Jobs</h1>
      <p className="mt-1 text-sm text-slate-500">Find roles by location and function.</p>
      <hr className="mt-3 border-violet-100" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType} className="pt-3">
            <h1 className="font-semibold text-slate-900">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-sm text-slate-600">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
      <div className="mt-5">
        <Button onClick={clearFilters} className="w-full text-sm">
          Clear Filter 
        </Button>
      </div>
    </aside>
  );
};

export default FilterCard;

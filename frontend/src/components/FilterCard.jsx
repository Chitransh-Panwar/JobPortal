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
    <aside className="w-full bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType} className="pt-3">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between items-center mt-5 ml-3">
        <Button
          onClick={clearFilters}
          className="text-sm text-white bg-[#6A38C2] hover:bg-[#5b30a6]"
        >
          Clear Filter 
        </Button>
      </div>
    </aside>
  );
};

export default FilterCard;

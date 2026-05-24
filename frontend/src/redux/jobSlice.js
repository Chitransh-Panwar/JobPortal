import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    salaryFilter: null,
    jobsLoading: false,
    includeExternalJobs: false,
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSalaryFilter: (state, action) => {
      state.salaryFilter = action.payload;
    },
    setJobsLoading: (state, action) => {
      state.jobsLoading = action.payload;
    },
    setIncludeExternalJobs: (state, action) => {
      state.includeExternalJobs = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setSalaryFilter,
  setJobsLoading,
  setIncludeExternalJobs
} = jobSlice.actions;
export default jobSlice.reducer;

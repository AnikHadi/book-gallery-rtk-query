import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
  searchByFilter: "",
  featuredByFilter: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      state.searchByFilter = action.payload;
    },
    filterByFeatured: (state, action) => {
      state.featuredByFilter = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterBySearch, filterByFeatured } = filterSlice.actions;

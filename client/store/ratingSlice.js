import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: 0,
  reducers: {
    setRating: (state, action) => action.payload,
    resetRating: () => 0,
  },
});

export const { setRating, resetRating } = ratingSlice.actions;
export default ratingSlice.reducer;

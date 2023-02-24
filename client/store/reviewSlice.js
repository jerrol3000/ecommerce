import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviews = createAsyncThunk(
  "products/fetchReviews",
  async (productId) => {
    try {
      const { data } = await axios.get(`/api/review/${productId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchById = createAsyncThunk("products/fetchById", async (id) => {
//   try {
//     const { data } = await axios.get(`/api/products/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });

const initialState = [];

const reviewtSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReviews.fulfilled]: (state, action) => action.payload,
  },
});

export default reviewtSlice.reducer;

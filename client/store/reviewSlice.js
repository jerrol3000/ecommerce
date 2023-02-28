import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendToken } from "./helperFunction";

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

export const postReview = createAsyncThunk(
  "products/postReview",
  async ({ productId, review }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/api/review/${productId}`,
        review,
        sendToken()
      );
      console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = [];

const reviewtSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReviews.fulfilled]: (state, action) => action.payload,
    [postReview.fulfilled]: (state, action) => action.payload,
  },
});

export default reviewtSlice.reducer;

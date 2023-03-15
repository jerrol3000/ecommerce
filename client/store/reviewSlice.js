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

//get all review
export const fetchAllReviews = createAsyncThunk(
  "products/fetchAllReviews",
  async () => {
    try {
      const { data } = await axios.get(`/api/review`);
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
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  "products/updateReview",
  async ({ productId, review }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/review/${productId}`,
        review,
        sendToken()
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  reviewsById: [],
  allReviews: [],
  postReview: [],
  averageRating: null,
};

const reviewtSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchReviews.fulfilled]: (state, action) => {
      state.reviewsById = action.payload;
    },
    [fetchAllReviews.fulfilled]: (state, action) => {
      state.allReviews = action.payload;
    },
    [postReview.fulfilled]: (state, action) => {
      state.postReview = action.payload;
    },
    [updateReview.fulfilled]: (state, action) => {
      state.postReview = action.payload;
    },
  },
});

export default reviewtSlice.reducer;

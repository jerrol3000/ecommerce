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
  async ({ reviewId, review }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/review/${reviewId}`,
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
  reviewsById: {},
  allReviews: [],
  postReview: [],
  editedReview: {},
  averageRating: 0,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsById = action.payload;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.allReviews = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.postReview = action.payload;
        const newReview = action.payload;
        state.allReviews.push(newReview);
        const { productId } = action.payload;
        const index = state.allReviews.findIndex(
          (review) => review.productId === productId
        );
        const array = state.allReviews.filter(
          (review) => review.productId === productId
        );
        if (index !== -1) {
          state.averageRating = Math.floor(
            array.reduce((pre, cur) => pre + cur.rating, 0) / array.length
          );
        } else {
          state.allReviews.push(action.payload);
          state.averageRating = Math.floor(
            array.reduce((pre, cur) => pre + cur.rating, 0) / array.length
          );
        }
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.editedReview = action.payload;
        const { productId } = action.payload;
        const array = state.allReviews.filter(
          (review) => review.productId === productId
        );
        state.averageRating = Math.floor(
          array.reduce((pre, cur) => pre + cur.rating, 0) / array.length
        );
      });
  },
});

export default reviewSlice.reducer;

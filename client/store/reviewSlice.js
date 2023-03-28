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

export const calculateAverageRating = createAsyncThunk(
  "products/calculateAverageRating",
  async (id, thunkAPI) => {
    const { allReviews } = await thunkAPI.getState().review;
    const array = allReviews.filter((review) => review.productId === id);
    return array.length
      ? Math.floor(
          array.reduce((pre, cur) => pre + cur.rating, 0) / array.length
        )
      : 0;
  }
);

const initialState = {
  reviewsById: [],
  allReviews: [],
  postReview: [],
  averageRating: 0,
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
      const { productId, rating } = action.payload;
      const index = state.allReviews.findIndex(
        (review) => review.productId === productId
      );
      if (index !== -1) {
        state.allReviews[index].rating = rating;
        state.averageRating = Math.floor(
          state.allReviews
            .filter((review) => review.productId === productId)
            .reduce((pre, cur) => pre + cur.rating, 0) /
            state.allReviews.filter((review) => review.productId === productId)
              .length
        );
      } else {
        state.allReviews.push(action.payload);
        state.averageRating = Math.floor(
          state.allReviews
            .filter((review) => review.productId === productId)
            .reduce((pre, cur) => pre + cur.rating, 0) /
            state.allReviews.filter((review) => review.productId === productId)
              .length
        );
      }
    },

    [updateReview.fulfilled]: (state, action) => {
      state.postReview = action.payload;
    },
  },
});

export default reviewtSlice.reducer;

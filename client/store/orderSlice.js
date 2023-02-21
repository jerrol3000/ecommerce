import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder) => {
    try {
      const { data } = await axios.post(`/api/order`, newOrder);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => action.payload,
  },
});

export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder) => {
    try {
      const { data } = await axios.post(`/api/checkout`, newOrder, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCart = createAsyncThunk("products/fetchCart", async (id) => {
  try {
    const { data } = await axios.get(`/api/checkout/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => action.payload,
    [fetchCart.fulfilled]: (state, action) => action.payload,
  },
});

export default orderSlice.reducer;

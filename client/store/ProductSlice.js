import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = [];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => action.payload,
  },
});

export default productSlice.reducer;

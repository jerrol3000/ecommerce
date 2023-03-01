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

export const fetchById = createAsyncThunk("products/fetchById", async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [fetchById.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
  },
});

export default productSlice.reducer;

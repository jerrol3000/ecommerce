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

export const deleteFromCart = createAsyncThunk(
  "products/deleteFromCart",
  async (cartId) => {
    try {
      const { data } = await axios.delete(`/api/checkout/${cartId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "products/updateCart",
  async ({ cartId, size, quantity }, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/checkout/${cartId}`, {
        size,
        quantity,
      });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, action) => [action.payload, ...state],
    [fetchCart.fulfilled]: (state, action) => action.payload,
    [updateCart.fulfilled]: (state, action) => {
      const updatedItem = action.payload;
      return state.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
    [deleteFromCart.fulfilled]: (state, action) => {
      const deletedItemId = action.payload;
      return state.filter((item) => item.id !== deletedItemId.id);
    },
  },
});

export default orderSlice.reducer;

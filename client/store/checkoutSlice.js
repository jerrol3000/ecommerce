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

const initialState = JSON.parse(localStorage.getItem("cart")) || [];
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    deleteFromLocalCart: (state, action) => {
      const newCart = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    },
    addToLocalCart: (state, action) => {
      const currentCart = state;
      if (currentCart.length) {
        const newCart = [...currentCart, action.payload];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      } else {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state));
        return state;
      }
    },
    updateLocalCart: (state, action) => {
      const { editingItemId, size, quantity } = action.payload;
      const updatedCart = state.map((item) =>
        item.productId === editingItemId ? { ...item, size, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    getLocalCart: (state, action) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => [
        action.payload,
        ...state,
      ])
      .addCase(fetchCart.fulfilled, (state, action) => action.payload)
      .addCase(updateCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        return state.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        const deletedItemId = action.payload;
        return state.filter((item) => item.id !== deletedItemId.id);
      });
  },
});
export const {
  deleteFromLocalCart,
  addToLocalCart,
  getLocalCart,
  updateLocalCart,
} = orderSlice.actions;
export default orderSlice.reducer;

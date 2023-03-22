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
  reducers: {
    deleteFromLocalCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));
      state = JSON.parse(localStorage.getItem("cart"));
      return state;
    },
    addToLocalCart: (state, action) => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (currentCart.length) {
        const newCart = [...currentCart, action.payload];
        localStorage.setItem("cart", JSON.stringify(newCart));

        return JSON.parse(localStorage.getItem("cart"));
      } else {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state));
        return JSON.parse(localStorage.getItem("cart"));
      }
    },
    getLocalCart: () => JSON.parse(localStorage.getItem("cart")) || [],
  },
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
export const { deleteFromLocalCart, addToLocalCart, getLocalCart } =
  orderSlice.actions;
export default orderSlice.reducer;

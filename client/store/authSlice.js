import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
const TOKEN = "token";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    const { data } = await axios.post("/auth/forgotPassword", email);
    console.log("response", data);
    // return thunkAPI.dispatch(setAuth(data));
  }
);

export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return thunkAPI.dispatch(setAuth(res.data));
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formVals, thunkAPI) => {
    try {
      const { data } = await axios.post(`/auth/${formVals.formName}`, formVals);
      console.log(`/auth/${formVals.formName}`);
      window.localStorage.setItem(TOKEN, data.token);
      thunkAPI.dispatch(me());
      history.push("/");
    } catch (authError) {
      console.log(authError);
      return thunkAPI.dispatch(setAuth({ error: authError }));
    }
  }
);

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      return action.payload;
    },
    logout: () => {
      window.localStorage.removeItem("token");
      history.push("/login");
      return {};
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

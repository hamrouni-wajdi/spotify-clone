import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      return { data: res.data.data.user };
    } catch (e) {
      throw e;
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      return { data: res.data.data.user };
    } catch (e) {
      throw e;
    }
  }
);

export const isLoggedIn = createAsyncThunk("user/isLoggedIn", async () => {
  try {
    const res = await axios.get("/users/isLoggedIn");
    console.log(res.data);

    return { data: res.data.data.user };
  } catch (e) {
    throw e;
  }
});

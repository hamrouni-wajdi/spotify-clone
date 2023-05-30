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
      console.log(res.data.data.user);

      return { data: res.data.data.user, token: res.data.token };
    } catch (e) {
      throw e;
    }
  }
);

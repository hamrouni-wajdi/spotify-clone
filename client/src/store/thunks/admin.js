import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getSongs = createAsyncThunk(
  "admin/getSongs",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/songs`);

      console.log("song", res.data.data.songs);
      return res.data.data.songs;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

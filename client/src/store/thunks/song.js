import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSong = createAsyncThunk("song/getSong", async (id) => {
  try {
    const res = await axios.get(`/songs/${id}`);

    return res.data.data.song;
  } catch (err) {
    throw err;
  }
});

export const likeSong = createAsyncThunk("song/likeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes", {
      song: id,
    });
    
    return res.data.status;
  } catch (err) {
    throw err;
  }
});

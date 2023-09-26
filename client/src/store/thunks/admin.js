import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "react-toastify";

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

export const uploadSong = createAsyncThunk(
  "playlist/uploadSong",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/songs`, data);

      toast.success("Song uploaded");

      return res.data.data.song;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

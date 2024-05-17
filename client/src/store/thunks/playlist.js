import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export const updatePlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/playlists/${id}`, data);

      toast.success("Playlisto updated");

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

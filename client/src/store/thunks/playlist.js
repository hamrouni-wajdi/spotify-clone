import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (id) => {
    try {
      const res = await axios.get(`/playlists/${id}`);

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const updatePlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ data, id }) => {
    try {
      const res = await axios.patch(`/playlists/${id}`, data);

      toast.success("Playlist updated");

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const likePlaylist = createAsyncThunk(
  "playlist/likePlaylist",
  async (id) => {
    try {
      const res = await axios.post(`/playlists/likes/add`, {
        playlist: id,
      });

      toast.success("Saved to Your Library");

      return res.data.playlists;
    } catch (e) {
      throw e;
    }
  },
);

export const dislikePlaylist = createAsyncThunk(
  "playlist/dislikePlaylist",
  async (id) => {
    try {
      const res = await axios.post(`/playlists/likes/remove`, {
        playlist: id,
      });

      toast.success("Removed from Your Library");

      return res.data.playlists;
    } catch (e) {
      throw e;
    }
  },
);

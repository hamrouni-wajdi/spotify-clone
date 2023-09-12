import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (id) => {
    try {
      // const res = await axios.get(`/playlists/${id}`);
      const res = await axios.get(`/playlists/${id}`);
      console.log(res);

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

      return res.data.playlists;
    } catch (e) {
      throw e;
    }
  },
);

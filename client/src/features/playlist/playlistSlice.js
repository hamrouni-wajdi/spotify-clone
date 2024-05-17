import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";
import { toast } from "react-toastify";

// Thunks
export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (id) => {
    const res = await axios.get(`/playlists/${id}`);
    return res.data.data.playlist;
  },
);

export const likePlaylist = createAsyncThunk(
  "playlist/likePlaylist",
  async (id) => {
    const res = await axios.post(`/playlists/likes/add`, {
      playlist: id,
    });

    toast.success("Saved to Your Library");
    return res.data.playlists;
  },
);

export const dislikePlaylist = createAsyncThunk(
  "playlist/dislikePlaylist",
  async (id) => {
    const res = await axios.post(`/playlists/likes/remove`, {
      playlist: id,
    });

    toast.success("Removed from Your Library");
    return res.data.playlists;
  },
);

// Slice
const initialState = {
  data: null,
  status: "idle", // 'idle' | 'loading' | 'success' | 'fail',
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPlaylist.rejected, (state) => {
        state.status = "fail";
      }),
});

// Selectors
export const selectPlaylist = (state) => state.playlist.data;
export const selectPlaylistStatus = (state) => state.playlist.status;

export default playlistSlice.reducer;

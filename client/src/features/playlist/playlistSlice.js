import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";

// Thunks
export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (id) => {
    const res = await axios.get(`/playlists/${id}`);
    return res.data.data.playlist;
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

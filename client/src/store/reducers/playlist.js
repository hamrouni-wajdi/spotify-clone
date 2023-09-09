import { createSlice } from "@reduxjs/toolkit";
import { getPlaylist, updatePlaylist } from "../thunks/playlist";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.playlist = action.payload.playlist;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.playlist = action.payload.playlist;
      });
  },
});

export default playlistSlice.reducer;

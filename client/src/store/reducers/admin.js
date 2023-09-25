import { createSlice } from "@reduxjs/toolkit";
import { getSongs } from "../thunks/admin";

const adminSlice = createSlice({
  name: "playlist",
  initialState: {
    songs: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get playlist
      .addCase(getSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
      });
  },
});

export default adminSlice.reducer;

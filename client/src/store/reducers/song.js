import { createSlice } from "@reduxjs/toolkit";
import { dislikeSong, getSong, likeSong } from "../thunks/song";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    song: null,
    isLiked: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get song
    builder
      .addCase(getSong.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.song = action.payload;
      })
      // like song
      .addCase(likeSong.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.isLiked = true;
      })
      // dislike song
      .addCase(dislikeSong.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.isLiked = false;
      });
  },
});

export default songSlice.reducer;

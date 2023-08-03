import { createSlice } from "@reduxjs/toolkit";
import { getSong } from "../thunks/song";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    song: null,
    isLiked: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get song
    builder.addCase(getSong.fulfilled, (state, action) => {
      state.song = action.payload;
    });
  },
});

export default songSlice.reducer;

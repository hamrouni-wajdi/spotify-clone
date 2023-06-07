import { createSlice } from "@reduxjs/toolkit";
import { getArtist } from "../thunks/artist";

const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artist: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtist.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
  },
});

export default artistSlice.reducer;

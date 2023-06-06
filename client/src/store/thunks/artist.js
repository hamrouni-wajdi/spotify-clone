import { createAsyncThunk } from "@reduxjs/toolkit";

const getArtist = createAsyncThunk("artist/getArtist", async ({}) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

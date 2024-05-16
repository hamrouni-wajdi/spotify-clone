import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";

// Thunks
export const getArtist = createAsyncThunk(
  "artist/getArtist",
  async (id, { rejectWithValue }) => {
    const res = await axios.get(`/users/${id}`);
    return res.data.data;
  },
);

// Slice
const initialState = {
  data: null,
  status: "idle", // 'idle' | 'loading' | 'success' | 'fail',
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getArtist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action);
        state.data = action.payload;
      }),
});

export const selectArtist = (state) => state.artist.data;
export const selectArtistStatus = (state) => state.artist.status;

export default artistSlice.reducer;

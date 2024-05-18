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

export const updatePlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ data, id }) => {
    // Prepare
    const formData = new FormData();

    console.log(data);

    formData.append("img", data.img);
    formData.append("name", data.name);
    formData.append("description", data.description);

    // Submit
    const res = await axios.patch(`/playlists/${id}`, data);

    toast.success("Playlist updated");
    return res.data.data;
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
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.data.name = action.payload.playlist.name;
        state.data.img = action.payload.playlist.img;
        state.data.description = action.payload.playlist.description;
      }),
});

// Selectors
export const selectPlaylist = (state) => state.playlist.data;
export const selectPlaylistStatus = (state) => state.playlist.status;

export default playlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  dislikeSong,
  followArtist,
  isLoggedIn,
  likeSong,
  loginUser,
  resetPassword,
  signupUser,
  unfollowArtist,
  becomeArtist,
  updateUser,
} from "../thunks/user";
import { dislikePlaylist, likePlaylist } from "../thunks/playlist";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    auth: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      })
      // Sign up
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      // Is loggedIn
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      }) // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      // Reset password
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload.data.user;
        state.auth = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        toast.error(action.payload.response.data.message);
      })
      // Like song
      .addCase(likeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })
      // Dislike song
      .addCase(dislikeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })
      // Follow user
      .addCase(followArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      }) // Follow user
      .addCase(unfollowArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      }) // Become an Artist
      .addCase(becomeArtist.fulfilled, (state, action) => {
        state.data.role = "artist";
      }) // Like playlist
      .addCase(likePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      }) // Dislike playlist
      .addCase(dislikePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      });
  },
});

export default userSlice.reducer;

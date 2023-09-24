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
      // Sign up
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      // Is auth
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      // Reset password
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload.data.user;
        state.auth = true;
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
      }) // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
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

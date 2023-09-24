import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      toast.success("Logged in successfully");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      toast.success("Welcome to spotify!");

      return { data: res.data.data.user, auth: true };
    } catch (e) {
      throw e;
    }
  },
);

export const isLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users/isLoggedIn");

      toast.success("Welcome back");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Like/dislike
export const likeSong = createAsyncThunk("song/likeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/add", {
      song: id,
    });

    toast.success("Song added to Liked Songs");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

export const dislikeSong = createAsyncThunk("song/dislikeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/remove", {
      song: id,
    });

    toast.success("Song removed from Liked Songs");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

// Follow artist
export const followArtist = createAsyncThunk(
  "user/followArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/follow/${id}`);

      toast.success("Added to Artists");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

export const unfollowArtist = createAsyncThunk(
  "user/unfollowArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/unfollow/${id}`);

      toast.success("Removed from Artists");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

// Form
export const becomeArtist = createAsyncThunk("user/becomeArtist", async () => {
  try {
    await axios.patch("/users/becomeArtist");

    toast.success("Now you're an artist");
  } catch (err) {
    throw err;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const res = await axios.patch("/users/updateMe", data);

    toast.success("Your data updated ");

    return res.data.data;
  } catch (err) {
    throw err;
  }
});

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data) => {
    try {
      await axios.post("users/forgotPassword", data);

      toast.success("Email sent");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/resetPassword/${data.id}`, data);

      toast.success("Reset password");

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data) => {
    try {
      await axios.patch("/users/updatePassword", data);

      toast.success("Updated password");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

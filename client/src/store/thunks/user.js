import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      return { data: res.data.data.user, auth: true };
    } catch (e) {
      throw e;
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

      return { data: res.data.data.user, auth: true };
    } catch (e) {
      throw e;
    }
  },
);

export const isLoggedIn = createAsyncThunk("user/isLoggedIn", async () => {
  try {
    const res = await axios.get("/users/isLoggedIn");

    return { data: res.data.data.user, auth: true };
  } catch (e) {
    throw e;
  }
});

// Like/dislike
export const likeSong = createAsyncThunk("song/likeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/add", {
      song: id,
    });

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
      console.log("follow thunk", res.data);

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
      console.log("unfollow thunk", res.data);

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

// Form
export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const res = await axios.patch("/users/updateMe", data);

    return res.data.data;
  } catch (err) {
    throw err;
  }
});

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data) => {
    try {
      const res = await axios.post("users/forgotPassword", data);

      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    try {
      const res = await axios.patch(`/users/resetPassword/${data.id}`, data);

      return res.data;
    } catch (err) {
      throw err;
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data) => {
    try {
      const res = await axios.patch("/users/updatePassword", data);
    } catch (err) {
      throw err;
    }
  },
);

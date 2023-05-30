import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../thunks/user";

let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    name: null,
    photo: null,
    role: null,
  },
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_USER_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.token = action.payload.token;
      })
      // Sign up
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.token = action.payload.token;
      });
  },
});

export default userSlice.reducer;

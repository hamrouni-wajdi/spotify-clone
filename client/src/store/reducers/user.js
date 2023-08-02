import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn, loginUser, signupUser } from "../thunks/user";

let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    name: null,
    photo: null,
    role: null,
  },
  auth: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_USER_STATE,
  reducers: {
    // isAuth: state => {
    //   console.log('here')
    //   console.log(cookie.load('jwt'))
    // }
  },
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
        state.auth = true;
      });
  },
});

export default userSlice.reducer;

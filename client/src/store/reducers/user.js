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
        // state.token = action.payload.token;
      })
      // Sign up
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.token = action.payload.token;
      })
      // Is auth
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.auth = true;
        state.data = action.payload.data;
      });
  },
});

// export const {isAuth} = userSlice.actions
export default userSlice.reducer;

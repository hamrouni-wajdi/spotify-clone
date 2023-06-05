import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import songReducer from "./reducers/song";

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer
  },
});

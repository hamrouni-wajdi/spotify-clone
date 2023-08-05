import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import songReducer from "./reducers/song";
import artistReducer from "./reducers/artist";
import playerReducer from "./reducers/player";

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    artist: artistReducer,
    player: playerReducer,
  },
});

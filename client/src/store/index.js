import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import playerReducer from "./reducers/player";
import playlistReducer from "./reducers/playlist";
import queueReducer from "./reducers/queue";
import adminReducer from "./reducers/admin";
import artistReducer from "../features/artist/artistSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    artist: artistReducer,
    player: playerReducer,
    playlist: playlistReducer,
    queue: queueReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import playerReducer from "./reducers/player";
import playlistReducer from "../features/playlist/playlistSlice.js";
import queueReducer from "./reducers/queue";
import adminReducer from "./reducers/admin";
import artistReducer from "../features/artist/artistSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    artist: artistReducer,
    playlist: playlistReducer,
    player: playerReducer,
    queue: queueReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

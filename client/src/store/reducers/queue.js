import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    list: [],
    current: 0,
  },
  reducers: {
    replaceQueue: (state, action) => {
      state.list = action.payload;
    },
    changeCurrent: (state, action) => {
      console.log("payload", action.payload);
      state.current = action.payload;
    },
    nextSong: (state) => {
      if (state.list.length - 1 === state.current) state.current = 0;
      else state.current += 1;
    },
    prevSong: (state) => {
      if (0 === state.current) state.current = state.list.length - 1;
      else state.current -= 1;
    },
  },
});

export const { replaceQueue, changeCurrent, nextSong, prevSong } =
  queueSlice.actions;
export default queueSlice.reducer;

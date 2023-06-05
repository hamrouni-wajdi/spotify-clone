import axios from "../../api/axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getSong = createAsyncThunk('song/getSong', async ({id}) => {
  try {
    const res = await axios.get(`/songs/${id}`)

    return res.data.data.song;
  } catch (err) {
    throw err;
  }
})
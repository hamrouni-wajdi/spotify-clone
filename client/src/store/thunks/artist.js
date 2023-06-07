import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArtist = createAsyncThunk("artist/getArtist", async () => {
  try {
    console.log("here");
    const res = await axios.get(`/users/646b202f887d97806c349f12`);

    console.log(res);

    return res.data.data;
  } catch (e) {
    console.log(e);
  }
});

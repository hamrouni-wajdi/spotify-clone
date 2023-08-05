import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArtist = createAsyncThunk("artist/getArtist", async () => {
  try {
    const res = await axios.get(`/users/64ce0a8e3e394ad58ebf755d`);

    return res.data.data;
  } catch (e) {
    console.log(e);
  }
});

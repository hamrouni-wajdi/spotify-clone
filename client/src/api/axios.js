import axios from "axios";

export default axios.create({
  // baseURL: "https://spotify-api.maqsud.me/api/v1/",
  // baseURL: "http://localhost:8000/api/v1/",
  baseURL: "https://spotify-tl14.onrender.com/api/v1/",
  withCredentials: true,
});

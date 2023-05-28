import axios from 'axios';

export default axios.create({
  // baseURL: 'https://spotify-xgfm.onrender.com/api/v1/',
  baseURL: 'http://localhost:8000/api/v1/',
  // baseURL: 'https://spotify-api.maqsud.me/api/v1/',
  withCredentials: true,
});

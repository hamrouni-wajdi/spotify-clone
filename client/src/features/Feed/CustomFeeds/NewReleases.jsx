import FeedRow from "../FeedRow.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.js";

const NewReleases = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await axios.get("/songs?sort=-createdAt&limit=5");
      const data = res.data.data.songs;
      console.log(data);
      setSongs(data);
    };

    fetchSongs();
  }, []);

  return (
    <FeedRow title="Discover the newest releases" list={songs} type="song" />
  );
};

export default NewReleases;

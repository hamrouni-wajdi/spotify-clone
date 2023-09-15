import ArtistCard from "../../UI/ArtistCard";
import PlaylistCard from "../../UI/PlaylistCard";
import "./Home.scss";

import { IoPlayCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

import likedSongsImg from "../../../img/likedSongs.jpeg";
import { Link } from "react-router-dom";
const img =
  "https://images.unsplash.com/photo-1684654488308-2229de99e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

const Home = (props) => {
  const user = useSelector((state) => state.user.data);

  const latest = [1, 2, 3, 4];
  const list = [1, 2, 3, 4, 5];

  return (
    user.id && (
      <div className="app-header">
        <h1 className="h1">👋 Hi {user.name}</h1>
        <div className="app-header__latest">
          <Link to="/likedSongs" className="app-header__latest-card">
            <img src={likedSongsImg} alt="Heart" />
            <div className="app-header__latest-card-name">
              <span>Liked Songs</span>
              <IoPlayCircle className="app-header__latest-card-btn" />
            </div>
          </Link>
          {latest.map((el) => (
            <div className="app-header__latest-card">
              <img src={img} />
              <div className="app-header__latest-card-name">
                <span>Artist Name</span>
                <IoPlayCircle className="app-header__latest-card-btn" />
              </div>
            </div>
          ))}
        </div>
        <h2 className="h2">Your Favourite Artists</h2>
        <div className="app-header__list">
          {user.followedArtists?.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </div>

        <h2 className="h2">Your Favourite Playlists</h2>
        <div className="app-header__list">
          {user.likedPlaylists.map((playlist) => (
            <PlaylistCard playlist={playlist} />
          ))}
        </div>

        <h2 className="h2">Top Artists</h2>
        <div className="app-header__list">
          {list.map((el) => (
            <ArtistCard />
          ))}
        </div>

        <h2 className="h2">Top Playlists</h2>
        <div className="app-header__list">
          {list.map((el) => (
            <PlaylistCard />
          ))}
        </div>
      </div>
    )
  );
};

export default Home;

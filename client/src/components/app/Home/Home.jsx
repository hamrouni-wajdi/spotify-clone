import ArtistCard from "../../UI/ArtistCard";
import PlaylistCard from "../../UI/PlaylistCard";
import "./Home.scss";

import { IoPlayCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

import likedSongsImg from "../../../img/likedSongs.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SquareList from "../../UI/SquareList";
const img =
  "https://images.unsplash.com/photo-1684654488308-2229de99e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

const Home = () => {
  const user = useSelector((state) => state.user.data);

  return (
    user.id && (
      <>
        <div className="app-header__img"> </div>
        <div className="app-header">
          <h1 className="h1" onClick={() => toast.success("Wow crazy")}>
            Good evening, wanna listen some music !?
          </h1>

          <h2 className="h2">
            {user.followedArtists.length === 0
              ? "Your favourite artists will appear here..."
              : "Your favourite artists"}
          </h2>
          <SquareList
            list={user.followedArtists.slice(0, 5)}
            artist={true}
            home={true}
          />

          <h2 className="h2">
            {user.likedPlaylists.length === 0
              ? "Your favourite playlists will appear here..."
              : "Your favourite playlists"}
          </h2>
          <SquareList list={user.likedPlaylists.slice(0, 5)} home={true} />

          {/*<h2 className="h2">Top Artists</h2>*/}
          {/*<div className="app-header__list">*/}
          {/*  {list.map((el) => (*/}
          {/*    <ArtistCard />*/}
          {/*  ))}*/}
          {/*</div>*/}

          {/*<h2 className="h2">Top Playlists</h2>*/}
          {/*<div className="app-header__list">*/}
          {/*  {list.map((el) => (*/}
          {/*    <PlaylistCard />*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      </>
    )
  );
};

export default Home;

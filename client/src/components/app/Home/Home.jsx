import "./Home.scss";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SquareList from "../../UI/SquareList";

const Home = () => {
  const {id, followedArtists, likedPlaylists} = useSelector((state) => state.user.data);

  return (
    id && (
      <>
        <div className="home__img" />
        <div className="home">
          <h1 className="h1" onClick={() => toast.success("Wow crazy")}>
            Good evening, wanna listen some music !?
          </h1>

          <h2 className="h2">
            {followedArtists.length === 0
              ? "Your favourite artists will appear here..."
              : "Your favourite artists"}
          </h2>
          <SquareList
            list={followedArtists.slice(0, 5)}
            artist={true}
            home={true}
          />

          <h2 className="h2">
            {likedPlaylists.length === 0
              ? "Your favourite playlists will appear here..."
              : "Your favourite playlists"}
          </h2>
          <SquareList list={likedPlaylists.slice(0, 5)} home={true} />
        </div>
      </>
    )
  );
};

export default Home;

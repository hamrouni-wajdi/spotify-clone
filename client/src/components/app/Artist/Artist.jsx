import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPauseCircle } from "react-icons/io5";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";
import { followArtist, unfollowArtist } from "../../../store/thunks/user";

const Artist = () => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state) => state.artist);
  const { followedArtists } = useSelector((state) => state.user.data);

  // Handler functions
  const getArtistHandler = () => {
    dispatch(getArtist());
  };

  // Follow artist
  const userFollowedArtist = () => {
    return followedArtists.includes(artist.id);
  };

  const followArtistHandler = () => {
    dispatch(followArtist(artist.id));
  };

  const unfollowArtistHandler = () => {
    dispatch(unfollowArtist(artist.id));
  };

  return (
    <div className="artist">
      <div className="artist__header">
        <span className="artist__badge">
          <img src={badgeImg} alt="Verified badge" /> Verified Artist
        </span>
        {/*<h1 className="artist__name">Rauf & Faik</h1>*/}
        {artist ? (
          <h1 className="artist__name">{artist.name}</h1>
        ) : (
          <h1 className="artist__name">No artist found</h1>
        )}
        <p>1,323 listeners</p>
      </div>

      <div className="artist__nav">
        <IoPauseCircle onClick={getArtistHandler} />
        {/* make this work afer auto loading artist */}
        {/*{artist && userFollowedArtist() ? (*/}
        {/*  <button onClick={followArtistHandler}>Follow</button>*/}
        {/*) : (*/}
        {/*  <button onClick={unfollowArtistHandler}>Unfollow</button>*/}
        {/*)}*/}
      </div>

      <div className="artist-songs">
        <div className="artist-songs__list">
          <h2 className="h2">Popular</h2>
          {artist && <List list={artist.songs} />}
        </div>
        <div className="artist-songs__liked">
          <h2 className="h2">Liked Songs</h2>
        </div>
      </div>
    </div>
  );
};

export default Artist;

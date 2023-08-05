import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPauseCircle } from "react-icons/io5";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";
import { followArtist, unfollowArtist } from "../../../store/thunks/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Artist = () => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state) => state.artist);
  const { followedArtists } = useSelector((state) => state.user.data);

  // React router
  const { id } = useParams();

  // Effects
  useEffect(() => {
    dispatch(getArtist(id));
  }, [id]);

  // Handler functions

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
    <>
      {artist ? (
        <div className="artist">
          <div className="artist__header">
            <span className="artist__badge">
              <img src={badgeImg} alt="Verified badge" /> Verified Artist
            </span>
            {/*<h1 className="artist__name">Rauf & Faik</h1>*/}
            <h1 className="artist__name">{artist.name}</h1>
            <p>1,323 listeners</p>
          </div>

          <div className="artist__nav">
            <IoPauseCircle />
            {/*make this work afer auto loading artist */}
            {!userFollowedArtist() ? (
              <button onClick={followArtistHandler}>Follow</button>
            ) : (
              <button onClick={unfollowArtistHandler}>Following</button>
            )}
          </div>

          <div className="artist-songs">
            <div className="artist-songs__list">
              <h2 className="h2">Popular</h2>
              <List list={artist.songs} />
            </div>
            <div className="artist-songs__liked">
              <h2 className="h2">Liked Songs</h2>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Artist;

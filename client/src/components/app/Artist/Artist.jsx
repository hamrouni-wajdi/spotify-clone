import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";
import { replaceQueue } from "../../../store/reducers/queue";
import { followArtist, unfollowArtist } from "../../../store/thunks/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { playPause } from "../../../store/reducers/player";

const Artist = () => {
  const { artist } = useSelector((state) => state.artist);
  const { followedArtists } = useSelector((state) => state.user.data);
  const { isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // React router
  const { id } = useParams();

  // Effects
  useEffect(() => {
    dispatch(getArtist(id));
  }, [id]);

  // Handler functions
  const playPauseHandler = () => {
    dispatch(playPause());
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

  const replaceQueueHandler = (songs) => {
    console.log(songs);
    dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {artist ? (
        <div className="artist">
          <div className="artist__header">
            <span className="artist__badge">
              <img src={badgeImg} alt="Verified badge" /> Verified Artist
            </span>
            <h1 className="artist__name">{artist.name}</h1>
            <p>1,323 listeners</p>
          </div>

          <div className="artist__nav">
            {/*{isPlaying ? (*/}
            {/*  <IoPauseCircle onClick={playPauseHandler} />*/}
            {/*) : (*/}
            {/*  <IoPlayCircle onClick={playPauseHandler} />*/}
            {/*)}*/}
            <IoPlayCircle onClick={() => replaceQueueHandler(artist.songs)} />
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

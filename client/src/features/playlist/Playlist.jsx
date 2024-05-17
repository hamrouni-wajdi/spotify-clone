import { useParams } from "react-router-dom";
import PlaylistHeader from "./PlaylistHeader.jsx";
import { useEffect } from "react";
import {
  getPlaylist,
  selectPlaylist,
  selectPlaylistStatus,
} from "./playlistSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Playlist = () => {
  const { id } = useParams();
  const status = useSelector(selectPlaylistStatus);
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylist(id));
  }, []);

  if (status === "fail") return <p>No playlist found with this id</p>;
  if (status !== "success") return <p>Loading...</p>;

  return (
    <div className="playlist">
      <PlaylistHeader playlist={playlist} />
      {/*<div className="playlist__header">*/}
      {/*  <div className="playlist__img">*/}
      {/*    <img src={playlist.img} alt="Playlisto cover" />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <p>Playlisto</p>*/}
      {/*    <h1 className="playlist__name">{playlist.name}</h1>*/}
      {/*    {playlist.description && (*/}
      {/*      <p className="playlist__des">{playlist.description}</p>*/}
      {/*    )}*/}
      {/*    <div className="playlist__user">*/}
      {/*      <img*/}
      {/*        className="playlist__user-img"*/}
      {/*        src={playlist.user.img}*/}
      {/*        alt="user"*/}
      {/*      />*/}
      {/*      <span className="playlist__user-name">{playlist.user.name}</span>*/}
      {/*      <span className="playlist__user-songs">*/}
      {/*        {playlist.songs.length} songs*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="playlist__nav">*/}
      {/*  <IoPlayCircle onClick={() => replaceQueueHandler(playlist.songs)} />*/}
      {/*  {playlist.user.id !== userId &&*/}
      {/*    (userLikedPlaylist(playlist.id) ? (*/}
      {/*      <IoHeart*/}
      {/*        className="heart heart--active"*/}
      {/*        onClick={() => dislikePlaylistHandler(playlist.id)}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <IoHeartOutline*/}
      {/*        className="heart"*/}
      {/*        onClick={() => likePlaylistHandler(playlist.id)}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  {playlist.user.id === userId && (*/}
      {/*    <RiEditCircleLine*/}
      {/*      onClick={openModalHandler}*/}
      {/*      style={{*/}
      {/*        fontSize: "3.2rem",*/}
      {/*        color: "#fff",*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}

      {/*<div className="playlist__songs">*/}
      {/*  <List list={playlist.songs} onPlaylist={true} pId={playlist.id} />*/}
      {/*</div>*/}
    </div>
  );
};

export default Playlist;

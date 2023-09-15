import "./Playlist.scss";
import likedSongsImg from "../../../img/likedSongs.jpeg";
import {
  IoCloseCircle,
  IoHeart,
  IoHeartOutline,
  IoPauseCircle,
  IoPlayCircle,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import {
  getPlaylist,
  likePlaylist,
  dislikePlaylist,
  updatePlaylist,
} from "../../../store/thunks/playlist";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { Link, useNavigate, useParams } from "react-router-dom";
import { replaceQueue } from "../../../store/reducers/queue";
import { likeSong, updateUser } from "../../../store/thunks/user";

const Playlist = () => {
  // State
  const [modal, setModal] = useState(false);

  // Ref
  const formRef = useRef();

  // Redux
  const likedSongs = useSelector((state) => state.user.data.likedSongs);
  // const { playlist } = useSelector((state) => state.playlist);
  // const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // Effects
  // useEffect(() => {
  //   dispatch(getPlaylist(id));
  // }, [id]);

  // Handlers
  const replaceQueueHandler = (songs) => {
    dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {likedSongs ? (
        <div className="playlist likedSongs">
          <div className="playlist__header">
            <div className="playlist__info">
              <p className="playlist__info--type">Playlist</p>
              <h1 className="playlist__name">Liked Songs</h1>
              <div></div>
              <div className="playlist__user">
                <span>You have {likedSongs.length} songs</span>
              </div>
            </div>
          </div>

          <div className="playlist-nav">
            <IoPlayCircle onClick={() => replaceQueueHandler(likedSongs)} />
          </div>

          <div className="playlist__songs">
            <List list={likedSongs} />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default Playlist;

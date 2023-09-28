import "./Playlist.scss";
import {
  IoCloseCircle,
  IoHeart,
  IoHeartOutline,
  IoPauseCircle,
  IoPencil,
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
import {
  deletePlaylist,
  getAllPlaylists,
  likeSong,
  updateUser,
} from "../../../store/thunks/user";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const Playlist = () => {
  // State
  const [modal, setModal] = useState(false);

  // Ref
  const formRef = useRef();

  // Redux
  const userId = useSelector((state) => state.user.data.id);
  const { playlist } = useSelector((state) => state.playlist);
  const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  // Router
  const { id } = useParams();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    dispatch(getPlaylist(id));
  }, [id]);

  // Handlers
  const replaceQueueHandler = (songs) => {
    console.log(songs);
    dispatch(replaceQueue({ songs }));
  };

  const openModalHandler = () => {
    if (playlist.user.id === userId) setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    await dispatch(updatePlaylist({ data: formData, id: playlist.id }));
    await dispatch(getAllPlaylists());
    setModal(false);
  };

  const deletePlaylistHandler = (id) => {
    dispatch(deletePlaylist(id));
    navigate("/");
  };

  const likePlaylistHandler = (id) => dispatch(likePlaylist(id));

  const dislikePlaylistHandler = (id) => dispatch(dislikePlaylist(id));

  const userLikedPlaylist = (id) => {
    let pl = likedPlaylists.find((obj) => obj.id === id);

    return pl ? true : false;
  };

  return (
    <>
      {userId && playlist ? (
        <div className="playlist">
          <div className="playlist__header">
            <div className="playlist__image">
              <img src={playlist.img} alt="Playlist cover" />
            </div>
            <div className="playlist__info">
              <p className="playlist__info--type">Playlist</p>
              <h1 className="playlist__name">{playlist.name}</h1>
              {playlist.description && (
                <p className="playlist__des">{playlist.description}</p>
              )}
              <div className="playlist__user">
                <img className="playlist__user-img" src={playlist.user.img} />
                <Link
                  className="playlist__user-name"
                  to={`/user/${playlist.user.id}`}
                >
                  {playlist.user.name}
                </Link>
                <span className="playlist__user-songs">
                  {playlist.songs.length} songs
                </span>
              </div>
            </div>
          </div>

          <div className="playlist-nav">
            <IoPlayCircle onClick={() => replaceQueueHandler(playlist.songs)} />
            {playlist.user.id !== userId &&
              (userLikedPlaylist(playlist.id) ? (
                <IoHeart
                  className="heart heart--active"
                  onClick={() => dislikePlaylistHandler(playlist.id)}
                />
              ) : (
                <IoHeartOutline
                  className="heart"
                  onClick={() => likePlaylistHandler(playlist.id)}
                />
              ))}
            {playlist.user.id === userId && (
              <IoPencil
                onClick={openModalHandler}
                style={{
                  fontSize: "3.2rem",
                  color: "#fff",
                }}
              />
            )}
          </div>

          <div className="playlist__songs">
            <List list={playlist.songs} onPlaylist={true} pId={playlist.id} />
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}

      {playlist && modal && (
        <div className="playlist-modal">
          <div className="playlist-modal__header">
            <h2>Edit playlist info</h2>
            <div className="playlist-modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <form
            className="playlist-modal__form"
            ref={formRef}
            onSubmit={formSubmitHandler}
          >
            <div className="playlist-modal__img">
              <img src={playlist.img} alt="Playlist cover" />
              <input type="file" name="img" />
            </div>
            <div>
              <input type="text" name="name" placeholder={playlist.name} />
              <textarea
                name="description"
                cols="30"
                placeholder="Add an optional description"
              ></textarea>
              <button>Save</button>
              <button
                style={{ background: "#EF4444", marginLeft: 8 }}
                onClick={(e) => {
                  e.preventDefault();
                  deletePlaylistHandler(playlist.id);
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Playlist;

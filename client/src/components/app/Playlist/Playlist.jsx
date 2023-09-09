import "./Playlist.scss";
import { IoCloseCircle, IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getPlaylist } from "../../../store/thunks/playlist";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { Link, useParams } from "react-router-dom";
import { replaceQueue } from "../../../store/reducers/queue";

const Playlist = () => {
  // State
  const [modal, setModal] = useState(true);

  // Redux
  const { playlist } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  // Router
  const { id } = useParams();

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
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  return (
    <>
      {playlist ? (
        <div className="playlist">
          <div className="playlist__header">
            <div className="playlist__image">
              <img src={playlist.img} alt="Playlist cover" />
            </div>
            <div className="playlist__info">
              <p className="playlist__info--type">Playlist</p>
              <h1 className="playlist__name">{playlist.name}</h1>
              <div></div>
              <div className="playlist__user">
                <img className="playlist__user-img" src={playlist.user.photo} />
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
          </div>

          <div className="playlist__songs">
            <List list={playlist.songs} />
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
          <form className="playlist-modal__form">
            <div className="playlist-modal__img">
              <img src={playlist.img} alt="Playlist cover" />
              <input type="file" />
            </div>
            <div>
              <input type="text" />
              <textarea name="description" cols="30"></textarea>
              <button>Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Playlist;

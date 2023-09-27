import "./List.scss";
import {
  IoCloseCircle,
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoPencil,
  IoTrain,
  IoTrash,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrent, replaceQueue } from "../../store/reducers/queue";
import { dislikeSong, likeSong } from "../../store/thunks/user";
import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const List = (props) => {
  // State
  const [songId, setSongId] = useState("");
  const [modal, setModal] = useState(false);

  // ⚛ Redux
  const { likedSongs, playlists } = useSelector((state) => state.user.data);
  const { currentId } = useSelector((state) => state.queue);
  const dispatch = useDispatch();

  const playSongHandler = (i, id) => {
    const songs = props.list;

    dispatch(changeCurrent({ i, id }));
    dispatch(replaceQueue({ songs, i, id }));
  };

  const userLikedSong = (id) => {
    let res = likedSongs.find((obj) => obj.id === id);

    return res ? true : false;
  };

  // 💚 like song
  const likeSongHandler = (song) => {
    dispatch(likeSong(song.id));
  };

  const dislikeSongHandler = (song) => {
    dispatch(dislikeSong(song.id));
  };

  const openModalHandler = (id) => {
    setModal(true);
    setSongId(id);
  };

  const closeModalHandler = () => setModal(false);

  const addSongToPlaylistHandler = async (id, songId) => {
    const res = await axios.post(`playlists/${id}/song/${songId}`);
    toast.success(res.data.message);
  };

  const removeSongFromPlaylistHandler = async (id, songId) => {
    const res = await axios.delete(`playlists/${id}/song/${songId}`);
    toast.success("Song removed");
  };

  return (
    <>
      <div className="list">
        {props.list &&
          props.list.map((el, i) => (
            <div
              className={`list-item ${
                el.artist.id === "6513505bef35c9d633139956" ? "vip" : ""
              } ${el.artist === "6513505bef35c9d633139956" ? "vip" : ""}`}
              key={el.id}
            >
              {currentId !== el.id ? (
                <span className="list__num">{i + 1}</span>
              ) : (
                <div className="anim">
                  <div className="sq sq1"></div>
                  <div className="sq sq2"></div>
                  <div className="sq sq3"></div>
                  <div className="sq sq4"></div>
                </div>
              )}
              <img src={el.img} alt="Song cover" />
              <span
                className={
                  (currentId === el.id ? "list--green" : "") +
                  " list-item__name"
                }
                onClick={() => playSongHandler(i, el.id)}
              >
                {el.name}
              </span>
              <span className="list__artist-name">{el.artist?.name}</span>
              <span className="list__count">{el.plays}</span>
              {userLikedSong(el.id) ? (
                <IoHeart onClick={() => dislikeSongHandler(el)} />
              ) : (
                <IoHeartOutline
                  style={{ color: "#fff" }}
                  onClick={() => likeSongHandler(el)}
                />
              )}
              <span>
                {props.admin && (
                  <IoPencil onClick={() => props.handler(el.id)} />
                )}
                {!props.admin &&
                  (props.onPlaylist ? (
                    <IoTrash
                      onClick={() =>
                        removeSongFromPlaylistHandler(props.pId, el.id)
                      }
                    />
                  ) : (
                    <IoEllipsisHorizontal
                      onClick={() => openModalHandler(el.id)}
                    />
                  ))}
              </span>
            </div>
          ))}
      </div>

      {modal && (
        <div className="list-modal">
          <div className="list-modal__header">
            <h2>Save song to</h2>
            <div className="list-modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <ul className="list-modal__list">
            {playlists.map((p, i) => (
              <li
                key={i}
                className="list-modal__item"
                onClick={() => addSongToPlaylistHandler(p.id, songId)}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default List;

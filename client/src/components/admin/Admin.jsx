import "./Admin.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSong,
  getSongs,
  updateSong,
  uploadSong,
} from "../../store/thunks/admin";
import List from "../UI/List";
import { IoCloseCircle } from "react-icons/io5";
import { deletePlaylist } from "../../store/thunks/user";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  // State
  const [song, setSong] = useState({});
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // Ref
  const formRef = useRef();
  const editFormRef = useRef();

  // Redux
  const { songs } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  // Router
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    dispatch(getSongs());
  }, []);

  // Handlers
  const openModalHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const openEditModalHandler = (id) => {
    const song = songs.find((song) => song.id === id);
    setSong(song);

    setEditModal(true);
  };

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    dispatch(uploadSong({ data: formData }));
    setModal(false);
  };

  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(editFormRef.current);
    dispatch(updateSong({ data: formData, id: song.id }));
    setEditModal(false);
  };

  const deleteSongHandler = (id) => {
    dispatch(deleteSong(id));
    setEditModal(false);
  };

  return (
    <>
      {songs && (
        <div className="admin">
          <div className="admin__header">
            <div className="admin__card">
              <span>{songs.length}</span> songs
            </div>
            <div className="admin__card">
              <span>{songs.reduce((acc, song) => acc + song.plays, 0)}</span>{" "}
              plays
            </div>
            <div className="admin__card" onClick={openModalHandler}>
              <span>+</span> upload new
            </div>
          </div>
          <div className="admin__list">
            <List list={songs} admin={true} handler={openEditModalHandler} />
          </div>
        </div>
      )}

      {songs && modal && (
        <div className="admin-modal">
          <div className="admin-modal__header">
            <h2>Upload a new song</h2>
            <div className="admin-modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <form
            ref={formRef}
            className="admin-modal__form"
            onSubmit={formSubmitHandler}
          >
            <label htmlFor="img">Img</label>
            <input type="file" name="img" id="img" placeholder="Img" />
            <label htmlFor="song">Song</label>
            <input type="file" name="song" id="song" />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Song name" />
            <button>Upload</button>
          </form>
        </div>
      )}

      {song && editModal && (
        <div className="admin-modal">
          <div className="admin-modal__header">
            <h2>Upload a new song</h2>
            <div className="admin-modal__close">
              <IoCloseCircle onClick={closeEditModalHandler} />
            </div>
          </div>
          <form
            ref={editFormRef}
            className="admin-modal__form"
            onSubmit={editFormSubmitHandler}
          >
            <img src={song.img} />
            <input type="file" name="img" id="img" placeholder="Img" />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder={song.name} />
            <button>Update</button>
            <button
              style={{ background: "#EF4444" }}
              onClick={(e) => {
                e.preventDefault();
                deleteSongHandler(song.id);
              }}
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;

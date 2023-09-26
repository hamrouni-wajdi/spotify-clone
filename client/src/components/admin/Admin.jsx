import "./Admin.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs, uploadSong } from "../../store/thunks/admin";
import List from "../UI/List";
import { IoCloseCircle } from "react-icons/io5";
import { upload } from "@testing-library/user-event/dist/upload";

const Admin = () => {
  // State
  const [modal, setModal] = useState(false);

  // Ref
  const formRef = useRef();

  // Redux
  const { songs } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    dispatch(uploadSong({ data: formData }));
  };

  return (
    <>
      <div className="admin">
        <div className="admin__header">
          <div className="admin__card">
            <span>7</span> songs
          </div>
          <div className="admin__card">
            <span>4562</span> plays
          </div>
          <div className="admin__card" onClick={openModalHandler}>
            <span>+</span> upload new
          </div>
        </div>
        <div className="admin__list">
          <List list={songs} admin={true} />
        </div>
      </div>
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
            {/*<img src={songs[0].img} />*/}
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
    </>
  );
};

export default Admin;

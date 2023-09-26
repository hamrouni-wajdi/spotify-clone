import "./Admin.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/thunks/admin";
import List from "../UI/List";

const Admin = () => {
  // Redux
  const { songs } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    dispatch(getSongs());
  }, []);

  return (
    <div className="admin">
      <div className="admin__header">
        <div className="admin__card">
          <span>7</span> songs
        </div>
        <div className="admin__card">
          <span>4562</span> plays
        </div>
        <div className="admin__card">
          <span>+</span> upload new
        </div>
      </div>
      <div className="admin__list">
        <List list={songs} admin={true} />
      </div>
    </div>
  );
};

export default Admin;

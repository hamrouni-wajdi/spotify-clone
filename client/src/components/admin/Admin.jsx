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
    <div>
      <List list={songs} admin={true} />
    </div>
  );
};

export default Admin;

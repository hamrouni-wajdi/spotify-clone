import "./List.scss";
import img from "./../../img/user.png";
import { IoHeart } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getSong } from "../../store/thunks/song";

const List = (props) => {
  // ⚛ Redux
  const dispatch = useDispatch();
  const playSongHandler = (id) => {
    dispatch(getSong(id));
  };

  return (
    <div className="list">
      {props.list &&
        props.list.map((el, i) => (
          <div
            className="list-item"
            key={el.id}
            onClick={() => playSongHandler(el.id)}
          >
            <span>{i + 1}</span>
            <img src={el.img} alt="Song cover image" />
            <span>{el.name}</span>
            <span>{el.plays}</span>
            <IoHeart />
            <span>3:15</span>
          </div>
        ))}
    </div>
  );
};

export default List;

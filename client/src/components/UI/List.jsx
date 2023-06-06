import "./List.scss";
import img from "./../../img/user.png";
import { IoHeart } from "react-icons/io5";

const List = (props) => {
  return (
    <div className="list">
      <div className="list-item">
        <span>1</span>
        <img src={img} alt="Song cover image" />
        <span>Song name</span>
        <span>5,468</span>
        <IoHeart />
        <span>3:15</span>
      </div>
      <div className="list-item">
        <span>1</span>
        <img src={img} alt="Song cover image" />
        <span>Song name</span>
        <span>5,468</span>
        <IoHeart />
        <span>3:15</span>
      </div>
      <div className="list-item">
        <span>1</span>
        <img src={img} alt="Song cover image" />
        <span>Song name</span>
        <span>5,468</span>
        <IoHeart />
        <span>3:15</span>
      </div>
      <div className="list-item">
        <span>1</span>
        <img src={img} alt="Song cover image" />
        <span>Song name</span>
        <span>5,468</span>
        <IoHeart />
        <span>3:15</span>
      </div>
      <div className="list-item">
        <span>1</span>
        <img src={img} alt="Song cover image" />
        <span>Song name</span>
        <span>5,468</span>
        <IoHeart />
        <span>3:15</span>
      </div>
    </div>
  );
};

export default List;

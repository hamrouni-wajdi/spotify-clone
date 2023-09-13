import "./SquareList.scss";
import { Link } from "react-router-dom";

const squareList = ({ list, artist }) => {
  return (
    <div className="square-list">
      {list.map((el) => (
        <Link
          to={artist ? `/artist/${el.id}` : `/playlist/${el.id}`}
          className={"square-card " + (artist && "square-card--artist")}
        >
          <img src={el.img} alt={el.name} />
          <div className="square-card__name">{el.name}</div>
          {artist ? <div>Artist</div> : <div>By {el.user.name}</div>}
        </Link>
      ))}
    </div>
  );
};

export default squareList;

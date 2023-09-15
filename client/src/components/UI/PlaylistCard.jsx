import "./PlaylistCard.scss";
import img from "./../../img/playlist.jpg";
import { Link } from "react-router-dom";

const PlaylistCard = (props) => {
  return (
    props.playlist && (
      <Link to={`/playlist/${props.playlist.id}`} className="card-playlist">
        <img src={props.playlist.img} alt="" />
        <p className="playlist-card__name">{props.playlist.name}</p>
        <p>Playlist</p>
      </Link>
    )
  );
};

export default PlaylistCard;

import "./ArtistCard.scss";
import { Link } from "react-router-dom";

const img =
  "https://storage.googleapis.com/media.discodonniepresents.com/2017/01/8f77a67d-artist-alan-walker-square-310x310.jpg";

const ArtistCard = (props) => {
  return (
    props.artist && (
      <Link to={`/artist/${props.artist.id}`} className="card-artist">
        <img src={props.artist?.img} alt="" />
        <p className="card-artist__name">{props.artist?.name}</p>
        <p>Artist</p>
      </Link>
    )
  );
};

export default ArtistCard;

import "./ArtistCard.scss";
import { Link } from "react-router-dom";

const img =
  "https://storage.googleapis.com/media.discodonniepresents.com/2017/01/8f77a67d-artist-alan-walker-square-310x310.jpg";

const ArtistCard = ({ artist }) => {
  return (
    artist && (
      <Link
        to={`/artist/${artist.id}`}
        className={`card-artist ${
          artist.id === "6513505bef35c9d633139956" ? "vip" : ""
        }`}
      >
        <img src={artist?.img} alt="" />
        <p className="card-artist__name">{artist?.name}</p>
        <p>Artist</p>
      </Link>
    )
  );
};

export default ArtistCard;

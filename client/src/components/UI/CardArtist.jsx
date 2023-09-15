import "./CardArtist.scss";

const img =
  "https://storage.googleapis.com/media.discodonniepresents.com/2017/01/8f77a67d-artist-alan-walker-square-310x310.jpg";

const CardArtist = (props) => {
  return (
    <div className="card-artist">
      <img src={props.artist?.img} alt="" />
      <p className="card-artist__name">{props.artist?.name}</p>
      <p>Artist</p>
    </div>
  );
};

export default CardArtist;

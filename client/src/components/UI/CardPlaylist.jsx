import "./CardPlaylist.scss";
import img from "./../../img/playlist.jpg";

const CardPlaylist = (props) => {
  return (
    <div className="card-playlist">
      <img src={img} alt="" />
      <p>Lofe Beats</p>
      <p className="type">Playlist</p>
    </div>
  );
};

export default CardPlaylist;

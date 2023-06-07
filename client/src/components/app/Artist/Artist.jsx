import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPauseCircle } from "react-icons/io5";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";

const Artist = () => {
  const dispatch = useDispatch();
  const { artist } = useSelector((state) => state.artist);

  // Handler functions
  const getArtistHandler = () => {
    console.log("click");
    dispatch(getArtist());
  };

  return (
    <div className="artist">
      <div className="artist__header">
        <span className="artist__badge">
          <img src={badgeImg} alt="Verified badge" /> Verified Artist
        </span>
        <h1 className="artist__name">Rauf & Faik</h1>
        <p>1,323 listeners</p>
      </div>
      <div className="artist__nav">
        <IoPauseCircle onClick={getArtistHandler} />
        <button>Following</button>
      </div>
      <div className="artist-songs">
        <div className="artist-songs__list">
          <h2 className="h2">Popular</h2>
          <List />
        </div>
        <div className="artist-songs__liked">
          <h2 className="h2">Liked Songs</h2>
        </div>
      </div>
    </div>
  );
};

export default Artist;

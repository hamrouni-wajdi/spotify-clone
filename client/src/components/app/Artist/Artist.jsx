import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import { IoPauseCircle } from "react-icons/io5";
import List from "../../UI/List";

const Artist = () => {
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
        <IoPauseCircle />
        <button>Following</button>
      </div>
      <List />
    </div>
  );
};

export default Artist;

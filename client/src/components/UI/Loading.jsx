import "./Loading.scss";
import loadingSvg from "./../../img/loading.svg";
import { Link } from "react-router-dom";

const Loading = ({ main = false, fullHeight = false }) => {
  return (
    <div className={`loading ${fullHeight && "full-height"}`}>
      <img src={loadingSvg} alt="" />
      {main && (
        <p>
          If it takes too long,&nbsp;
          <Link to="login">please log in here</Link>
        </p>
      )}
    </div>
  );
};

export default Loading;

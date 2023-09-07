import "./Nav.scss";
import "./NavLibrary.scss";
import {
  IoHomeOutline,
  IoLibraryOutline,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <div>
      <div className="nav">
        <div className="nav-link">
          <IoHomeOutline />
          <span>Home</span>
        </div>
        <div className="nav-link">
          <IoSearch />
          <span>Search</span>
        </div>
      </div>
      <div className="library">
        <div className="library-link">
          <div className="library-link__link">
            <IoLibraryOutline />
            <span>Library</span>
          </div>
          <div className="library-link__add">+</div>
          <Link to={"/artist"}>Artist</Link>
          <Link to={"/"}>Home</Link>
        </div>
      </div>
      <div className="nav">
        <div className="nav-link">
          <IoPersonCircleOutline />
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

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
        <Link to={"/"} className="nav-link">
          <IoHomeOutline />
          <span>Home</span>
        </Link>
        <Link to="/search" className="nav-link">
          <IoSearch />
          <span>Search</span>
        </Link>
      </div>
      <div className="library">
        <div className="library-link">
          <div className="library-link__link">
            <IoLibraryOutline />
            <span>Library</span>
          </div>
          <div className="library-link__add">+</div>
        </div>
      </div>
      <div className="nav">
        <Link to="/" className="nav-link">
          <IoPersonCircleOutline />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;

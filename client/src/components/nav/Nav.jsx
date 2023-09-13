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
      <Link to={"/"}>Home</Link>
      <Link to={"/search"}>Search</Link>
      <br />
      <Link to={"/artist/64f9832d10dbf93f2e5af3cc"}>AW</Link>
      <Link to={"/artist/64f88ed5c20246c3c14e688d"}>CP</Link>
      <Link to={"/artist/64f9e78083e383c2f5e11c3e"}>CPY</Link>
      <br />
      <Link to={"/playlist/64fc4ad1cf33fdb3633e6bb9"}>P1</Link>
      {/*<Link to={"/artist/64f88ed5c20246c3c14e688d"}>CP</Link>*/}
      {/*<Link to={"/artist/64f9e78083e383c2f5e11c3e"}>CPY</Link>*/}
    </div>
  );
};

export default Nav;

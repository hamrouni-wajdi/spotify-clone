import "./Nav.scss";
import { IoHomeOutline, IoSearch } from "react-icons/io5";

const Nav = (props) => {
  return (
    <div className="nav">
      <div className="nav-link">
        <IoHomeOutline /> Home
      </div>
      <div className="nav-link">
        <IoSearch /> Search
      </div>
    </div>
  );
};

export default Nav;

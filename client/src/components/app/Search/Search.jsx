import "./Search.scss";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="search">
      <div className="search__nav">
        <form>
          <input type="text" placeholder="What your want to listen to?" />
          <IoSearch className="search__icon" />
        </form>
      </div>
    </div>
  );
};

export default Search;

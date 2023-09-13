import "./Search.scss";
import axios from "../../../api/axios";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import List from "../../UI/List";

const Search = () => {
  // State
  const [queryType, setQueryType] = useState("song");
  const [results, setResults] = useState(null);

  // Handlers
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.get(`/search/song?name=${e.target[0].value}`);

    setResults({
      type: "song",
      list: res.data.data,
    });
  };

  const changeTagHandler = (tag) => {
    setQueryType(tag);
  };

  return (
    <div className="search">
      <div className="search__nav">
        <form onSubmit={formSubmitHandler}>
          <input type="text" placeholder="What your want to listen to?" />
          <IoSearch className="search__icon" />
        </form>
      </div>
      <ul className="search__tags">
        <li
          className={
            "search__tag " + (queryType === "song" && "search__tag--active")
          }
          onClick={() => changeTagHandler("song")}
        >
          Song
        </li>
        <li
          className={
            "search__tag " + (queryType === "artist" && "search__tag--active")
          }
          onClick={() => changeTagHandler("artist")}
        >
          Artist
        </li>
        <li
          className={
            "search__tag " + (queryType === "playlist" && "search__tag--active")
          }
          onClick={() => changeTagHandler("playlist")}
        >
          Playlist
        </li>
      </ul>
      <div className="list">
        {queryType === "song" && results?.type === "song" && (
          <List list={results.list} search={true} />
        )}
      </div>
    </div>
  );
};

export default Search;

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
    console.log(results);
  };

  return (
    <div className="search">
      <div className="search__nav">
        <form onSubmit={formSubmitHandler}>
          <input type="text" placeholder="What your want to listen to?" />
          <IoSearch className="search__icon" />
        </form>
      </div>
      <div className="list">
        {results && results.type === "song" && (
          <List list={results.list} search={true} />
        )}
      </div>
    </div>
  );
};

export default Search;

import SavedLink from "./SavedLink.jsx";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SavedSearch from "./SavedSearch.jsx";
import { useState } from "react";

const StyledSaved = styled.div`
  height: calc(100% - 12rem);
  padding: 0 0.8rem;
  overflow-y: scroll;
`;

const Saved = ({ activeTag }) => {
  const { likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );
  const [query, setQuery] = useState("");

  const artistList = [...followedArtists];
  const playlistList = [...likedPlaylists, ...playlists];
  const list = activeTag
    ? activeTag === "artists"
      ? artistList
      : playlistList
    : [...artistList, ...playlistList];
  const sortedList = list.sort((a, b) => (a.name > b.name ? 1 : -1));
  const searchedList = list.filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase()),
  );
  const renderedList = query.length ? searchedList : sortedList;

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleClearQuery = () => {
    setQuery("");
  };

  return (
    <StyledSaved className="saved">
      <SavedSearch
        query={query}
        onChangeQuery={handleChangeQuery}
        onClearQuery={handleClearQuery}
      />

      {renderedList?.map((item) => (
        <SavedLink key={item.id} item={item} />
      ))}
    </StyledSaved>
  );
};

export default Saved;

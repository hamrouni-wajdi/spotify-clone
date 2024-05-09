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

const Saved = () => {
  const { likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );

  const [query, setQuery] = useState("");

  const list = [...likedPlaylists, ...followedArtists, ...playlists];
  const sortedList = list.sort((a, b) => (a.name > b.name ? 1 : -1));
  const searchedList = list.filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase()),
  );
  const renderedList = query.length ? searchedList : sortedList;

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <StyledSaved className="saved">
      <SavedSearch onChangeQuery={handleChangeQuery} />

      {renderedList?.map((item) => (
        <SavedLink key={item.id} item={item} />
      ))}
    </StyledSaved>
  );
};

export default Saved;

import SavedLink from "./SavedLink.jsx";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledSaved = styled.div`
  height: calc(100% - 12rem);
  padding: 0 0.8rem;
  overflow-y: scroll;
`;

const Saved = () => {
  const { likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );

  const sortedList = [...likedPlaylists, ...followedArtists, ...playlists].sort(
    (a, b) => (a.name > b.name ? 1 : -1),
  );

  return (
    <StyledSaved className="saved">
      {sortedList?.map((item) => (
        <SavedLink key={item.id} item={item} />
      ))}
    </StyledSaved>
  );
};

export default Saved;

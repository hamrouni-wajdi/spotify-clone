import "./Library.scss";
import LibraryLink from "./LibraryLink.jsx";
import likedSongsImg from "../../img/likedSongs.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/thunks/user.js";
import styled from "styled-components";
import LibraryHeader from "./Library/LibraryHeader.jsx";
import Saved from "./Library/Saved.jsx";

const StyledLibrary = styled.div`
  overflow: hidden;
  height: 100%;

  background-color: var(--color-black);
  border-radius: 8px;
`;

const Library = () => {
  return (
    <StyledLibrary>
      <LibraryHeader />
      <Saved />
    </StyledLibrary>
  );
};

export default Library;

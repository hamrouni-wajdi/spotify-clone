import styled from "styled-components";
import LibraryHeader from "./LibraryHeader.jsx";
import Saved from "./Saved.jsx";

const StyledLibrary = styled.div`
  flex-grow: 1;
  overflow: hidden;

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

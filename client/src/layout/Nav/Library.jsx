import React from "react";

import "./Library.scss";
import { RiAddFill, RiBook3Line } from "react-icons/ri";
import LibraryLink from "./LibraryLink.jsx";
import likedSongsImg from "../../img/likedSongs.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/thunks/user.js";
import styled from "styled-components";

const StyledLibrary = styled.div`
  overflow: hidden;
  height: 100%;

  background-color: var(--color-black);
  border-radius: 8px;
`;

const Header = styled.header`
  padding: 0.8rem 1.6rem;
`;

const HeaderTitle = styled.div`
  padding: 0.8rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  font-size: 1.6rem;
  font-weight: 600;

  svg {
    font-size: 2.4rem;
  }
`;

const AddButton = styled.button`
  height: 3.2rem;
  width: 3.2rem;
  padding: 0.8rem;

  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 5rem;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    background: var(--color-highlight);
  }

  &:active {
    background: var(--color-press);
  }
`;

const Library = () => {
  const { id, likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );
  const dispatch = useDispatch();

  const isArtist = (el) => el.role === "artist";

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
  };

  const saved = (list) =>
    list
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((item) => (
        <LibraryLink
          key={item.id}
          isArtist={isArtist(item)}
          to={(isArtist(item) ? "/artist/" : "/playlist/") + item.id}
          img={item.img}
        >
          {item.name}
        </LibraryLink>
      ));

  return (
    <StyledLibrary>
      <Header>
        <HeaderTitle>
          <RiBook3Line />
          <span>Library</span>
          <AddButton onClick={handleCreatePlaylist}>
            <RiAddFill />
          </AddButton>
        </HeaderTitle>
      </Header>

      {id && (
        <div className="saved">
          <LibraryLink
            isArtist={false}
            to="/likedSongs"
            img={likedSongsImg}
            pinned={true}
          >
            Liked Songs
          </LibraryLink>

          {saved([...likedPlaylists, ...followedArtists, ...playlists])}
        </div>
      )}
    </StyledLibrary>
  );
};

export default Library;

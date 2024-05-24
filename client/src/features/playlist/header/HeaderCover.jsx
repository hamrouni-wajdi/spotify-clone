import React from 'react';
import styled from 'styled-components';
import { RiPencilLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { selectPlaylist } from '../playlistSlice.js';
import Modal from '../../../components/Modal.jsx';

const StyledCover = styled.div`
  height: 18rem;
  width: 18rem;

  position: relative;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 4px 6rem rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    svg {
      display: inline-block;
    }

    img {
      filter: brightness(70%);
    }
  }
`;

const PencilIcon = styled(RiPencilLine)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 1000;

  font-size: 6rem;
`;

const Img = styled.img`
  width: 100%;
`;

const HeaderCover = () => {
  const playlist = useSelector(selectPlaylist);

  return (
    <Modal.Open name="playlist">
      <StyledCover>
        <PencilIcon />
        <Img src={playlist.img} alt="Playlist cover" />
      </StyledCover>
    </Modal.Open>
  );
};

export default HeaderCover;

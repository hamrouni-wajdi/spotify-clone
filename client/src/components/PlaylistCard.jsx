import styled from "styled-components";
import { RiPlayFill } from "react-icons/ri";
import React from "react";

const StyledCard = styled.div`
  padding: 1.2rem;
  flex: 1;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-highlight);

    div button {
      opacity: 1;
      translate: 0;
    }
  }
`;

const ImgContainer = styled.div`
  margin-bottom: 0.8rem;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const Name = styled.p`
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-text-sub);
`;

// TODO: 2 use cases, make it re-usable
const PlayButton = styled.button`
  height: 4.8rem;
  width: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;

  transition: 0.3s;
  opacity: 0;
  translate: 0 1rem;

  background: var(--color-brand);
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5rem;

  svg {
    font-size: 2.4rem;
  }

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: var(--color-brand-press);
    scale: 1;
  }
`;

const ArtistCard = () => {
  return (
    <StyledCard>
      <ImgContainer>
        <Img src="https://ik.imagekit.io/8cs4gpobr/spotify/playlists/playlist-65ae756987219cb71d711d73-1705932237921_GETr42FNd.jpeg" />
        <PlayButton>
          <RiPlayFill />
        </PlayButton>
      </ImgContainer>
      <Name>Best of Taylor</Name>
      <Description>Top streamed songs of Taylor Swift</Description>
    </StyledCard>
  );
};

export default ArtistCard;

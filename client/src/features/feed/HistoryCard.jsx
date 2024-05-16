import React from "react";
import { RiPlayFill } from "react-icons/ri";
import styled from "styled-components";

const Card = styled.div`
  height: 4.8rem;
  padding-right: 0.8rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;
  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    button {
      opacity: 1;
    }
  }
`;

const CardImg = styled.img`
  height: 100%;
`;

const CardName = styled.span`
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
`;

const PlayButton = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;

  background: var(--color-brand);
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5rem;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: var(--color-brand-press);
    scale: 1;
  }
`;

const HistoryCard = ({ setGradientColor }) => {
  const randomHexColor =
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

  return (
    <Card onMouseEnter={() => setGradientColor(randomHexColor)}>
      <CardImg src="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-6519566c4be72b587b795192-1696159508277__JdgJejgj.jpeg" />
      <CardName>Billie Eilish</CardName>
      <PlayButton>
        <RiPlayFill />
      </PlayButton>
    </Card>
  );
};

export default HistoryCard;

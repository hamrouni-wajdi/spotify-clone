import styled from "styled-components";
import { RiPlayFill } from "react-icons/ri";
import React from "react";

const StyledPlayButton = styled.button`
  height: ${({ $size }) => ($size ? $size + "rem" : "3.2rem")};
  width: ${({ $size }) => ($size ? $size + "rem" : "3.2rem")};

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-brand);
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
  border-radius: 5rem;

  svg {
    font-size: ${({ $iconSize }) => ($iconSize ? $iconSize + "rem" : "1.6rem")};
  }

  &:hover {
    scale: 1.05;
  }

  &:active {
    background-color: var(--color-brand-press);
    scale: 1;
  }
`;

const PlayButton = ({ size, iconSize }) => {
  return (
    <StyledPlayButton $size={size} $iconSize={iconSize}>
      <RiPlayFill />
    </StyledPlayButton>
  );
};

export default PlayButton;

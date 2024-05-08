import styled, { css } from "styled-components";

const StyledTags = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Tag = styled.span`
  height: 3.2rem;
  padding: 0 1.2rem;

  display: inline-flex;
  align-items: center;

  font-size: 1.4rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 50rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.04);
  }

  ${({ $active }) =>
    $active &&
    css`
      color: #000;
      background-color: #fff;

      &:hover {
        background-color: #fff;
      }

      &:active {
        background-color: rgb(183, 183, 183);
      }
    `}
`;

const Tags = () => {
  return (
    <StyledTags>
      <Tag role="button" $active>
        Playlists
      </Tag>
      <Tag role="button">Artists</Tag>
    </StyledTags>
  );
};

export default Tags;

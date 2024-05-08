import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledSavedLink = styled(NavLink)`
  padding: 0.8rem;

  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1.2rem;

  border-radius: 6px;

  &:hover {
    background: var(--color-highlight);
  }

  &:active {
    background: #000;
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: rgba(255, 255, 255, 0.07);

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.04);
      }
    `}
`;

const Img = styled.img`
  border-radius: 4px;
  width: 4.8rem;

  ${({ $artist }) =>
    $artist &&
    css`
      border-radius: 5rem;
    `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  margin-bottom: 0.2rem;
  font-size: 1.6rem;
  color: #fff;
`;

// TODO: Make 14 base font size
const Type = styled.span`
  color: var(--color-text-sub);
  font-size: 1.4rem;
`;

const SavedLink = ({ item, children }) => {
  const isArtist = item.role === "artist";
  const link = (isArtist ? "/artist/" : "/playlist/") + item.id;
  const pinned = false;

  return (
    <StyledSavedLink to={link} $active={false}>
      <Img src={item.img} alt="Heart" $artist={isArtist} />
      <Content>
        <Name>{item.name}</Name>
        <Type>
          <span>{pinned ? "📌 - " : null}</span>
          <span>{isArtist ? "Artist" : "Playlist"}</span>
        </Type>
      </Content>
    </StyledSavedLink>
  );
};

export default SavedLink;

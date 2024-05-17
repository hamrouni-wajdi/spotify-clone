import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const StyledPlaylistHeader = styled.header`
  padding: 8.4rem 2rem 2rem 2rem;

  display: flex;
  gap: 2rem;

  color: #fff;

  // Gradient
  ${({ $color = "#64748b" }) => css`
    background-color: ${$color};
    background-image: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%);
  `}
`;

const Cover = styled.div`
  height: 18rem;
  width: 18rem;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 4px 6rem rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Type = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
`;

// TODO: Auto adjust text line based on length
const Name = styled.h1`
  font-size: 9.6rem;
  font-weight: 800;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.4rem;
  font-weight: 400;
`;

const Author = styled.div`
  margin-top: 0.8rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const AuthorImg = styled.img`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 5rem;
`;

const AuthorName = styled(Link)`
  &,
  &:link,
  &:visited {
    font-size: 1.4rem;
    font-weight: 600;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const PlaylistHeader = ({ playlist }) => {
  return (
    <StyledPlaylistHeader>
      <Cover>
        <img src={playlist.img} alt="Playlist cover" />
      </Cover>

      <Info>
        <Type>Playlist</Type>
        <Name>{playlist.name}</Name>
        {playlist.description && (
          <Description>All of the Artist's single releases</Description>
        )}
        <Author>
          <AuthorImg src={playlist.user.img} alt="User profile" />
          {/* TODO: Modify this after user profile is created */}
          <AuthorName to={""}>{playlist.user.name}</AuthorName>
        </Author>
      </Info>
    </StyledPlaylistHeader>
  );
};

export default PlaylistHeader;

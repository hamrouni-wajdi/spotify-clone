import styled, { css } from "styled-components";
import badgeImg from "../../img/verify.png";
import PlayButton from "../../components/PlayButton.jsx";
import List from "../../components/UI/List.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArtist, selectArtist, selectArtistStatus } from "./artistSlice.js";

function tintColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}

const StyledArtist = styled.div``;

const Header = styled.header`
  height: 30rem;
  padding: 6.4rem 1.8rem 1.8rem 1.8rem;

  display: flex;
  flex-direction: column;

  color: #fff;

  // Gradient
  ${({ $color = "#1ed760" }) => css`
    background-color: ${$color};
    background-image: repeating-radial-gradient(
        circle at 0 0,
        transparent 0,
        ${$color} 10px
      ),
      repeating-linear-gradient(
        ${tintColor($color, -10)},
        ${tintColor($color, -30)}
      );
  `}
`;

const Verified = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  font-size: 1.4rem;

  img {
    height: 2.4rem;
  }
`;

const ArtistName = styled.h1`
  font-size: 9.6rem;
  font-weight: 800;
`;

const ListenersCount = styled.p`
  font-size: 1.6rem;
  line-height: 2;
  margin-top: 0.4rem;
`;

const Body = styled.div`
  position: relative;
`;

const Gradient = styled.div`
  width: 100%;
  height: 24rem;
  position: absolute;

  // Gradient
  ${({ $color = "#1ed760" }) => css`
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #121212),
      linear-gradient(${$color}, ${$color});
  `}
`;

const Nav = styled.nav`
  padding: 1.8rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
  position: relative;
  z-index: 1000;
`;

const FollowButton = styled.button`
  padding: 0.3rem 1.5rem;

  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: #fff;
  background: transparent;
  border: 1px solid #727272;
  border-radius: 5rem;

  transition: all 0.1s;

  &:hover {
    scale: 1.02;
    border-color: #fff;
  }

  &:active {
    scale: 1;
    color: #727272;
    border-color: #727272;
  }
`;

const Content = styled.div`
  padding: 0 1.8rem 1.8rem 1.8rem;
  position: relative;
  z-index: 1000;
`;

const SongsHeading = styled.h2`
  margin-bottom: 1.8rem;
  color: #fff;
  font-size: 2.4rem;
  font-weight: 600;
`;

const Artist = () => {
  const { id } = useParams();
  const artist = useSelector(selectArtist);
  const status = useSelector(selectArtistStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtist(id));
  }, [id, dispatch]);

  if (status !== "success") return <p>Loading...</p>;

  return (
    <StyledArtist>
      <Header $color="#49796B">
        <Verified>
          <img src={badgeImg} alt="Verified badge" />
          <span>Verified Artist</span>
        </Verified>

        <ArtistName>{artist.name}</ArtistName>
        <ListenersCount>
          {/* TODO: this should be calculated by backend in the future */}
          {artist.songs.reduce((acc, song) => acc + song.plays, 0)} listeners
        </ListenersCount>
      </Header>

      <Body>
        <Gradient $color="#49796B" />

        <Nav>
          <PlayButton size={5.6} iconSize={2.4} />
          <FollowButton>Follow</FollowButton>
        </Nav>

        <Content>
          <SongsHeading>Popular</SongsHeading>
          <List list={artist.songs} />
        </Content>
      </Body>
    </StyledArtist>
  );
};

export default Artist;

import styled, { css } from "styled-components";
import History from "../features/Feed/History.jsx";
import { useState } from "react";
import TopSongs from "../features/Feed/CustomFeeds/TopSongs.jsx";
import NewReleases from "../features/Feed/CustomFeeds/NewReleases.jsx";
import FavouriteArtists from "../features/Feed/CustomFeeds/FavouriteArtists.jsx";
import Footer from "../components/Footer.jsx";

const StyledHome = styled.div`
  padding: calc(6.4rem + 0.8rem) 1.8rem 0;
  min-height: 100vh;

  transition: all 2s;

  ${({ $gradientColor }) => css`
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6),
        #121212 40vh
      ),
      linear-gradient(
        to bottom,
        ${$gradientColor},
        ${$gradientColor} 40vh,
        transparent 40vh,
        transparent 100%
      );
  `}
`;

const Home = () => {
  // TODO: Fix performance, this re-renders whole app when gradient changes
  const [gradientColor, setGradientColor] = useState("#8b5cf6");

  return (
    <StyledHome className="home" $gradientColor={gradientColor}>
      <History setGradientColor={setGradientColor} />

      <TopSongs />
      <NewReleases />
      <FavouriteArtists />

      <Footer />
    </StyledHome>
  );
};

export default Home;

import styled, { css } from "styled-components";
import History from "../features/Feed/History.jsx";
import { useState } from "react";

const StyledHome = styled.div`
  padding: calc(6.4rem + 0.8rem) 1.8rem 0;
  min-height: 100vh;

  transition: all 2s;

  ${({ $gradientColor }) => css`
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6),
        #121212 50vh
      ),
      linear-gradient(
        to bottom,
        ${$gradientColor},
        ${$gradientColor} 50vh,
        transparent 50vh,
        transparent 100%
      );
  `}
`;

const Home = () => {
  // TODO: Fix performance, this re-renders whole app when gradient changes
  const [gradientColor, setGradientColor] = useState("#8b5cf6");

  // const { followedArtists, likedPlaylists } = useSelector(
  //   (state) => state.user.data,
  // );
  // const [topSongs, setTopSongs] = useState([]);
  // const [newReleases, setNewReleases] = useState([]);
  //
  // // FIXME: Refactor and fix data lost on re-render
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await axios.get(`/songs?sort=-plays&limit=5`);
  //     const res2 = await axios.get(`/songs?sort=-createdAt&limit=5`);
  //
  //     setTopSongs(res.data.data.songs);
  //     setNewReleases(res2.data.data.songs);
  //   };
  //
  //   fetcher();
  // }, []);

  return (
    <StyledHome className="home" $gradientColor={gradientColor}>
      <History setGradientColor={setGradientColor} />
      {/*<h2 className="h2">Top Songs</h2>*/}
      {/*<SquareList list={topSongs} type={"song"} />*/}

      {/*<h2 className="h2">New Releases</h2>*/}
      {/*<SquareList list={newReleases} type={"song"} />*/}

      {/*{followedArtists.length > 0 && (*/}
      {/*  <>*/}
      {/*    <h2 className="h2">Your favourite artists</h2>*/}
      {/*    <SquareList list={followedArtists.slice(0, 5)} type="artist" />*/}
      {/*  </>*/}
      {/*)}*/}

      {/*{likedPlaylists.length > 0 && (*/}
      {/*  <>*/}
      {/*    <h2 className="h2">Your favourite playlists</h2>*/}
      {/*    <SquareList list={likedPlaylists.slice(0, 5)} type="playlist" />*/}
      {/*  </>*/}
      {/*)}*/}
    </StyledHome>
  );
};

export default Home;

import PlayButton from "../../components/PlayButton.jsx";
import styled from "styled-components";
import { replaceQueue } from "../../store/reducers/queue.js";
import { useDispatch } from "react-redux";

const Nav = styled.nav`
  padding: 2rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
  position: relative;
  z-index: 1000;
`;

const PlaylistNav = ({ playlist }) => {
  console.log(playlist);
  const dispatch = useDispatch();

  const handlePlayPlaylist = () => {
    if (playlist.songs.length)
      dispatch(replaceQueue({ songs: playlist.songs }));
  };

  return (
    <Nav>
      <PlayButton size={5.6} iconSize={2.4} onClick={handlePlayPlaylist} />
    </Nav>
  );
};

export default PlaylistNav;

import PlayButton from "../../components/PlayButton.jsx";
import styled, { css } from "styled-components";
import { replaceQueue } from "../../store/reducers/queue.js";
import { useDispatch, useSelector } from "react-redux";
import { dislikePlaylist, likePlaylist } from "./playlistSlice.js";
import {
  RiAddCircleLine,
  RiCheckboxCircleFill,
  RiIndeterminateCircleLine,
  RiLockFill,
  RiMoreLine,
} from "react-icons/ri";
import Menu from "../../components/Menu.jsx";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  padding: 2rem;

  display: flex;
  align-items: center;
  gap: 2.6rem;
  position: relative;
  z-index: 1000;
`;

const LikeButton = styled(RiAddCircleLine)`
  font-size: 3.2rem;
  cursor: pointer;

  &:hover {
    scale: 1.04;
    color: #fff;
  }

  &:active {
    scale: 1;
    color: var(--color-text-sub);
  }
`;

const DislikeButton = styled(RiCheckboxCircleFill)`
  font-size: 3.2rem;
  color: var(--color-brand);
  cursor: pointer;

  &:hover {
    scale: 1.04;
  }

  &:active {
    color: var(--color-brand-press);
    scale: 1;
  }
`;

const MenuButton = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  color: var(--color-text-sub);
  background: transparent;

  svg {
    font-size: 3.2rem;
  }

  &:hover {
    color: #fff;
    scale: 1.04;
  }

  &:active {
    color: var(--color-text-sub);
    scale: 1;
  }
`;

// TEMP
const MenuList = styled.div`
  width: 20rem;
  padding: 0.4rem;
  color: #fff;
`;

const MenuItem = styled(Link)`
  padding: 1.2rem 0.8rem 1.2rem 1.2rem;
  display: block;

  font-size: 1.4rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ $underline }) =>
    $underline &&
    css`
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `}
`;

const PlaylistNav = ({ playlist }) => {
  const userId = useSelector((state) => state.user.data.id);
  const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  const handlePlayPlaylist = () => {
    if (playlist.songs.length)
      dispatch(replaceQueue({ songs: playlist.songs }));
  };

  // TODO: This should be handled by server
  const isLikedPlaylist = (id) => !!likedPlaylists.find((el) => el.id === id);

  const handleLikePlaylist = () => dispatch(likePlaylist(playlist.id));
  const handleDislikePlaylist = () => dispatch(dislikePlaylist(playlist.id));

  return (
    <Nav>
      <PlayButton size={5.6} iconSize={2.4} onClick={handlePlayPlaylist} />

      {/* TODO: This should be prevented in server */}
      {playlist.user.id !== userId &&
        (isLikedPlaylist(playlist.id) ? (
          <DislikeButton onClick={handleDislikePlaylist} />
        ) : (
          <LikeButton onClick={handleLikePlaylist} />
        ))}

      <Menu>
        <Menu.Open>
          <MenuButton>
            <RiMoreLine />
          </MenuButton>
        </Menu.Open>
        <Menu.Body>
          <Menu.Item>
            <RiLockFill />
            <span>Make Private</span>
          </Menu.Item>
          <Menu.Item>
            <RiIndeterminateCircleLine />
            <span>Delete</span>
          </Menu.Item>
        </Menu.Body>
      </Menu>
    </Nav>
  );
};

export default PlaylistNav;

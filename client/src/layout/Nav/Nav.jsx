import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RiHome4Fill,
  RiHome4Line,
  RiMusicFill,
  RiMusicLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import Library from "./Library.jsx";
import styled from "styled-components";

const Block = styled.div`
  padding: 1.2rem 2.4rem;

  background-color: var(--color-black);
  border-radius: 9px;
`;
/**
 * @description Icon will be changed from outline to fill when link is active
 */
const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    height: 4rem;

    display: flex;
    align-items: center;
    gap: 2rem;

    font-size: 1.6rem;
    font-weight: 700;
    color: inherit;

    svg {
      font-size: 2.4rem;
    }
  }

  // Toggle icons
  .fill {
    display: none;
  }

  &.active {
    color: #fff;

    .fill {
      display: inline-block;
    }

    .line {
      display: none;
    }
  }
`;

const Nav = () => {
  const { role } = useSelector((state) => state.user.data);

  return (
    <nav className="nav">
      <Block>
        <StyledLink to="/">
          <RiHome4Line className="line" />
          <RiHome4Fill className="fill" />

          <span>Home</span>
        </StyledLink>

        <StyledLink to="/search">
          <RiSearchLine className="line" />
          <RiSearchFill className="fill" />
          <span>Search</span>
        </StyledLink>
      </Block>

      <div className="nav__block">
        <NavLink to="/" className="nav__link">
          <RiHome4Line className="line" />
          <RiHome4Fill className="fill" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search" className="nav__link">
          <RiSearchLine className="line" />
          <RiSearchFill className="fill" />
          <span>Search</span>
        </NavLink>
      </div>

      <Library />

      <div className="nav__block">
        {role === "artist" && (
          <NavLink to="/admin" className="nav__link">
            <RiMusicLine className="line" />
            <RiMusicFill className="fill" />
            <span>Admin</span>
          </NavLink>
        )}

        <NavLink to="/profile" className="nav__link">
          <RiUserLine className="line" />
          <RiUserFill className="fill" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;

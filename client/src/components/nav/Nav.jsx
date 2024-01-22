import "./Nav.scss";
import "./NavLibrary.scss";
import likedSongsImg from "../../img/likedSongs.jpeg";
import { createPlaylist } from "../../store/thunks/user";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LibraryLink from "./LibraryLink";
import {RiAddFill, RiBook3Line, RiHome4Line, RiMusicLine, RiSearchLine, RiUserLine} from "react-icons/ri";

const Nav = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const isArtist = (el) => el.role === "artist";

  const createPlaylistHandler = () => {
    dispatch(createPlaylist());
  };

  return (
    <div className="nav">
      <div className="nav__block">
        <NavLink to={"/"} className="nav__link">
          <RiHome4Line />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className="nav__link">
          <RiSearchLine />
          <span>Search</span>
        </NavLink>
      </div>
      <div className="library">
        <div className="library__header">
          <RiBook3Line />
          <span>Library</span>
          <RiAddFill
            style={{ marginLeft: "auto", fontSize: 28, cursor: "pointer" }}
            onClick={createPlaylistHandler}
          />
        </div>
        {user.id && (
          <div className="saved">
            <LibraryLink
              isArtist={false}
              to="/likedSongs"
              img={likedSongsImg}
              pinned={true}
            >
              Liked Songs
            </LibraryLink>
            {[
              ...user.likedPlaylists,
              ...user.followedArtists,
              ...user.playlists,
            ]
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((el) => (
                <LibraryLink
                  key={el.id}
                  isArtist={isArtist(el)}
                  to={(isArtist(el) ? "/artist/" : "/playlist/") + el.id}
                  img={el.img}
                >
                  {el.name}
                </LibraryLink>
              ))}
          </div>
        )}
      </div>
      <div className="nav__block">
        {user?.role === "artist" && (
          <NavLink to="/admin" className={`nav__link`}>
            <RiMusicLine />
            <span>Admin</span>
          </NavLink>
        )}
        <NavLink to="/profile" className="nav__link">
          <RiUserLine />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;

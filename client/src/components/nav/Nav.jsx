import "./Nav.scss";
import "./NavLibrary.scss";
import likedSongsImg from "../../img/likedSongs.jpeg";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoMusicalNoteOutline,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";
import { createPlaylist } from "../../store/thunks/user";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LibraryLink from "./LibraryLink";

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
          <IoHomeOutline />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className="nav__link">
          <IoSearch />
          <span>Search</span>
        </NavLink>
      </div>
      <div className="library">
        <div className="library__header">
          <IoLibraryOutline />
          <span>Library</span>
          <IoAddCircleOutline
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
            <IoMusicalNoteOutline />
            <span>Admin</span>
          </NavLink>
        )}
        <NavLink to="/profile" className="nav__link">
          <IoPersonCircleOutline />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;

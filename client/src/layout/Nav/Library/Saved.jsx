import React from "react";
import LibraryLink from "../LibraryLink.jsx";
import likedSongsImg from "../../../img/likedSongs.jpeg";
import { useSelector } from "react-redux";

const Saved = () => {
  const { id, likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );

  const isArtist = (el) => el.role === "artist";

  const saved = (list) =>
    list
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((item) => (
        <LibraryLink
          key={item.id}
          isArtist={isArtist(item)}
          to={(isArtist(item) ? "/artist/" : "/playlist/") + item.id}
          img={item.img}
        >
          {item.name}
        </LibraryLink>
      ));

  if (!id) return null;

  return (
    <div className="saved">
      <LibraryLink
        isArtist={false}
        to="/likedSongs"
        img={likedSongsImg}
        pinned={true}
      >
        Liked Songs
      </LibraryLink>

      {saved([...likedPlaylists, ...followedArtists, ...playlists])}
    </div>
  );
};

export default Saved;

import React from "react";
import Card from "./Card.jsx";
import { useDispatch } from "react-redux";
import { replaceQueue } from "../../store/reducers/queue.js";

/**
 *
 * @returns {Element}
 * @constructor
 * @instance Card
 */
const SongCard = ({ data }) => {
  const { img, name } = data;
  const dispatch = useDispatch();

  const handlePlaySong = (song) => {
    dispatch(replaceQueue({ songs: [song], i: 0, id: song.id }));
  };

  return (
    <Card
      img={img}
      imgBorder="square"
      name={name}
      description="Song"
      onButtonClick={() => handlePlaySong(data)}
    />
  );
};

export default SongCard;

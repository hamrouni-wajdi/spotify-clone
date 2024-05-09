import React from "react";
import Card from "./Card.jsx";

/**
 *
 * @returns {Element}
 * @constructor
 * @instance Card
 */
const ArtistCard = () => {
  return (
    <Card
      img="https://ik.imagekit.io/8cs4gpobr/spotify/users/user-65bb78fac2ead01c9898c4ce-1707134158527_ew3ALD6XK.jpeg"
      imgBorder="round"
      name="Linkin Park"
      description="Artist"
    />
  );
};

export default ArtistCard;

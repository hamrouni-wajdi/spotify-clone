import React from "react";
import Card from "./Card.jsx";

/**
 *
 * @returns {Element}
 * @constructor
 * @instance Card
 */
const ArtistCard = ({ data }) => {
  const { img, name } = data;

  return <Card img={img} imgBorder="round" name={name} description="Artist" />;
};

export default ArtistCard;

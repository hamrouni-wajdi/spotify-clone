import "./SquareList.scss";

const squareList = ({ list, artist }) => {
  return (
    <div className="square-list">
      {list.map((el) => (
        <div className={"square-card " + (artist && "square-card--artist")}>
          <img src={el.img} alt={el.name} />
          <div className="square-card__name">{el.name}</div>
          {artist ? <div>Artist</div> : <div>By {el.user.name}</div>}
        </div>
      ))}
    </div>
  );
};

export default squareList;

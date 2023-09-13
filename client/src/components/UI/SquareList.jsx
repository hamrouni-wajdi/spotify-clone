import "./SquareList.scss";

const squareList = (props) => {
  return (
    <div className="square-list">
      {props.list.map((el) => (
        <div className="square-card">
          <img src={el.img} alt={el.name} />
          <div className="square-card__name">{el.name}</div>
          <div>By {el.user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default squareList;

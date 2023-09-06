import "./List.scss";
import { IoEllipsisHorizontal, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrent } from "../../store/reducers/queue";
import { dislikeSong, likeSong } from "../../store/thunks/user";

const List = (props) => {
  // ⚛ Redux
  const likedSongs = useSelector((state) => state.user.data.likedSongs);
  const currentId = useSelector((state) => state.queue.current);
  const dispatch = useDispatch();

  const playSongHandler = (id, i) => {
    dispatch(changeCurrent(i));
  };

  // 💚 like song
  const likeSongHandler = (id) => dispatch(likeSong(id));

  const dislikeSongHandler = (id) => dispatch(dislikeSong(id));

  return (
    <div className="list">
      {props.list &&
        props.list.map((el, i) => (
          <div
            className="list-item"
            key={el.id}
            onClick={() => playSongHandler(el.id, i)}
          >
            {currentId !== i ? (
              <span className="list__num">{i + 1}</span>
            ) : (
              <div className="anim">
                <div className="sq sq1"></div>
                <div className="sq sq2"></div>
                <div className="sq sq3"></div>
                <div class="sq sq4"></div>
              </div>
            )}
            <img src={el.img} alt="Song cover" />
            <span className={currentId === i && "list--green "}>{el.name}</span>
            <span>{el.plays}</span>
            {/*{el.isLiked ? <IoHeart onClick={likeSong} /> : null}*/}
            {likedSongs.includes(el.id) ? (
              <IoHeart onClick={() => dislikeSongHandler(el.id)} />
            ) : (
              <IoHeartOutline
                style={{ color: "#fff" }}
                onClick={() => likeSongHandler(el.id)}
              />
            )}
            <span>
              <IoEllipsisHorizontal />
            </span>
          </div>
        ))}
    </div>
  );
};

export default List;

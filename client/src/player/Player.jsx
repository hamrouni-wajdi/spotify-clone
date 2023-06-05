import './Player.scss';
import { IoHeart } from 'react-icons/io5';
import {useDispatch, useSelector} from "react-redux";
import {getSong} from "../store/thunks/song";

const img =
  'https://images.unsplash.com/photo-1659922964423-bbecb913f7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80';

const Player = (props) => {
  const {song} = useSelector(state => state.song)
  const dispatch = useDispatch()

  const getSongHandler = () => {
    dispatch(getSong({id: '647dea0845407a3b165ea4d3'}))
  }

  return (
    <div className='player'>
      {song &&
        <>
      <div className='player-song'>
        <img src={song.img} alt='' />
        <div className='player-song__context'>
          <span className='player-song__name'>{song.name}</span>
          <span className='player-song__artist'>{song.artist.name}</span>
        </div>
        <IoHeart className='player-song__like' />
      </div>

         </>
      }
      <div>
        <button onClick={getSongHandler}>aa</button>
      </div>
      <div></div>
    </div>
  );
};

export default Player;

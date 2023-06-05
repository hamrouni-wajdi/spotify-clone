import './Player.scss';
import { IoHeart } from 'react-icons/io5';
import {useDispatch} from "react-redux";
import {getSong} from "../store/thunks/song";

const img =
  'https://images.unsplash.com/photo-1659922964423-bbecb913f7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80';

const Player = (props) => {
  const dispatch = useDispatch()

  const getSongHandler = () => {
    console.log('get song')
    dispatch(getSong({id: '647ddc919302dce8e676f767'}))
  }

  return (
    <div className='player'>
      <div className='player-song'>
        <img src={img} alt='' />
        <div className='player-song__context'>
          <span className='player-song__name'>Porsche</span>
          <span className='player-song__artist'>Racers</span>
        </div>
        <IoHeart className='player-song__like' />
      </div>
      <div>
        <button onClick={getSongHandler}>aa</button>
      </div>
      <div></div>
    </div>
  );
};

export default Player;

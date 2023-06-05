import './Player.scss';
import { IoHeart } from 'react-icons/io5';
import {useDispatch, useSelector} from "react-redux";
import {getSong} from "../store/thunks/song";
import {useEffect, useRef, useState} from "react";

const img =
  'https://images.unsplash.com/photo-1659922964423-bbecb913f7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80';

const Player = (props) => {
  // ⚛ Redux
  const {song} = useSelector(state => state.song)
  const dispatch = useDispatch()

  // Ref
  const audioRef = useRef();

  // State
  const [isPlaying, setIsPlaying] = useState(false)

  // Effect
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef])

  const getSongHandler = () => {
    dispatch(getSong({id: '647ded0e45407a3b165ea4e2'}))
  }

  // Music player
  const togglePlayPauseHandler = () => setIsPlaying(pre => !pre)


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
          <div>
            <audio ref={audioRef} src={song.song} controls autoPlay />
            <button onClick={togglePlayPauseHandler}>PLay/Pause</button>
          </div>
         </>
      }

      <div>
        <button onClick={getSongHandler}>aa</button>
      </div>
    </div>
  );
};

export default Player;

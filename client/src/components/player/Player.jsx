import "./Player.scss";
import {
  IoHeart,
  IoHeartOutline,
  IoPauseCircle,
  IoPlayCircle,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoRepeat,
  IoShuffle,
  IoVolumeMediumOutline,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { dislikeSong, likeSong } from "../../store/thunks/song";
import { useCallback, useEffect, useRef, useState } from "react";

const img =
  "https://images.unsplash.com/photo-1659922964423-bbecb913f7ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80";

const Player = (props) => {
  // ⚛ Redux
  const { song, isLiked } = useSelector((state) => state.song);
  const dispatch = useDispatch();

  // Ref
  const audioRef = useRef();
  const progressRef = useRef();
  const playAnimationRef = useRef();
  const volumeRef = useRef();

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // We need this function above because it is being called in useEffect
  const repeat = useCallback(() => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    progressRef.current.value = time;
    progressRef.current.style.setProperty(
      "--range-progress",
      `${(progressRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressRef, setCurrentTime]);

  // Effect
  useEffect(() => {
    // Prevent useEffect triggered before audio is loaded
    if (audioRef.current === undefined) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  const likeSongHandler = () => dispatch(likeSong(song.id));

  const dislikeSongHandler = () => dispatch(dislikeSong(song.id));

  // Music player
  const togglePlayPauseHandler = () => {
    setIsPlaying((pre) => !pre);
    if (navigator && navigator.mediaSession) {
      console.log("navigator is here");
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${song.name}`,
        artist: "Maqsud's Spotify",
        artwork: [{ src: song.img }],
      });
    }
  };

  const progressChangeHandler = () => {
    audioRef.current.currentTime = progressRef.current.value;
  };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value);
    e.target.style.setProperty("--range-progress", `${e.target.value}%`);
  };

  const onLoadedMetadataHandler = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressRef.current.max = seconds;
  };

  // Helper functions
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="player">
      {song && (
        <>
          <div className="player-song">
            <img src={song.img} alt="" />
            <div className="player-song__context">
              <span className="player-song__name">{song.name}</span>
              <span className="player-song__artist">{song.artist.name}</span>
            </div>
            {isLiked === true ? (
              <IoHeart
                className="player-song__like player-song__like--green"
                onClick={dislikeSongHandler}
              />
            ) : (
              <IoHeartOutline
                className="player-song__like"
                onClick={likeSongHandler}
              />
            )}
          </div>
          <div>
            <audio
              ref={audioRef}
              src={song.song}
              onLoadedMetadata={onLoadedMetadataHandler}
            />

            <div className="player__icons">
              <IoShuffle />
              <IoPlaySkipBackSharp />
              <button
                className="player__icon-btn"
                onClick={togglePlayPauseHandler}
              >
                {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
              </button>
              <IoPlaySkipForwardSharp />
              <IoRepeat />
            </div>
            <div className="player__range">
              <span className="player-song__time">
                {formatTime(currentTime)}
              </span>
              <input
                ref={progressRef}
                type="range"
                defaultValue={0}
                onChange={progressChangeHandler}
              />
              <span className="player-song__time">{formatTime(duration)}</span>
            </div>
          </div>
        </>
      )}

      <div className="player__volume">
        <IoVolumeMediumOutline />
        <input
          ref={volumeRef}
          type="range"
          min={0}
          max={100}
          value={volume}
          defaultValue={100}
          onChange={(e) => volumeChangeHandler(e)}
        />
      </div>
    </div>
  );
};

export default Player;

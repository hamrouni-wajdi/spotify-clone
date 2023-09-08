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
import { dislikeSong, likeSong } from "../../store/thunks/user";
import { useCallback, useEffect, useRef, useState } from "react";
import { playPause } from "../../store/reducers/player";
import { nextSong, prevSong } from "../../store/reducers/queue";

const Player = () => {
  // ⚛ Redux
  const currentIndex = useSelector((state) => state.queue.current);
  const queue = useSelector((state) => state.queue.list);
  const song = queue[currentIndex];
  // const { song } = useSelector((state) => state.song);
  const { likedSongs } = useSelector((state) => state.user.data);
  const { isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  // Ref
  const audioRef = useRef();
  const progressRef = useRef();
  const playAnimationRef = useRef();
  const volumeRef = useRef();

  // State
  // const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);

  // We need this function above because it is being called in useEffect
  const repeat = useCallback(() => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    progressRef.current.value = time;
    progressRef.current.style.setProperty(
      "--range-progress",
      `${(progressRef.current.value / duration) * 100}%`,
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

  // Widow event to play payse audio
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(e.code === "Space");
      if (e.code === "Space") {
        dispatch(playPause());
      }
    });
  }, []);

  const likeSongHandler = () => dispatch(likeSong(song.id));

  const dislikeSongHandler = () => dispatch(dislikeSong(song.id));

  // Music player
  const togglePlayPauseHandler = () => {
    // setIsPlaying((pre) => !pre);
    dispatch(playPause());
    // if (navigator && navigator.mediaSession) {
    //   navigator.mediaSession.metadata = new MediaMetadata({
    //     title: `${song.name}`,
    //     artist: "Maqsud's Spotify",
    //     artwork: [{ src: song.img }],
    //   });
    // }
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

  const handleNext = () => {
    dispatch(nextSong());
  };

  const handlePrev = () => {
    dispatch(prevSong());
  };

  // Navigator control
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    dispatch(prevSong());
  });

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    dispatch(nextSong());
  });

  navigator.mediaSession.setActionHandler("play", () => {
    dispatch(playPause());
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    dispatch(playPause());
  });

  const onEndedHandler = () => {
    handleNext();
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

  //-- Like
  const userLikedSong = () => {
    return likedSongs.includes(song.id);
  };

  const repeatSongHandler = () => {
    setRepeatSong((state) => !state);
    audioRef.current.loop = !repeatSong;
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
            {userLikedSong() === true ? (
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
              onEnded={onEndedHandler}
              autoPlay={true}
            />

            <div className="player__icons">
              <IoShuffle />
              <IoPlaySkipBackSharp onClick={handlePrev} />
              <button
                className="player__icon-btn"
                onClick={togglePlayPauseHandler}
              >
                {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
              </button>
              <IoPlaySkipForwardSharp onClick={handleNext} />
              {repeatSong ? (
                <IoRepeat
                  className={"player__repeat"}
                  onClick={repeatSongHandler}
                />
              ) : (
                <IoRepeat onClick={repeatSongHandler} />
              )}
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

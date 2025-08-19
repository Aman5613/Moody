import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function moodSongs({ Songs }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play / Pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="px-30 mt-10">
      <h1 className="text-2xl font-bold underline my-5">Recommended Songs</h1>
      {Songs.map((song) => (
        <div key={song._id} className="flex flex-col gap-2 py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="song_title text-xl font-semibold">{song.title}</p>
              <p className="song_artist opacity-50">{song.artist}</p>
            </div>

            <button
              onClick={togglePlayPause}
              className="cursor-pointer outline-none hover:scale-110 active:scale-95 duration-200"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>

          {/* Hidden Audio Tag */}
          <audio ref={audioRef} src={song.Audio}></audio>
        </div>
      ))}
    </div>
  );
}

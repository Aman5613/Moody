import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MoodSongs({ Songs }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);

  // Play / Pause handling
  const handlePlayPause = (index) => {
    // If clicking a new song
    if (currentSongIndex !== index) {
      // Pause previous
      if (audioRefs.current[currentSongIndex]) {
        audioRefs.current[currentSongIndex].pause();
      }

      setCurrentSongIndex(index);
      audioRefs.current[index].play();
      setIsPlaying(true);
      return;
    }

    // If clicking the same song
    if (isPlaying) {
      audioRefs.current[index].pause();
    } else {
      audioRefs.current[index].play();
    }

    setIsPlaying(!isPlaying);
  };

  // Track seek bar
  const handleSeek = (index, value) => {
    const audio = audioRefs.current[index];
    audio.currentTime = value;
  };

  return (
    <div className="md:px-30 md:mt-10">
      <h1 className="text-xl font-bold underline my-5">Recommended Songs</h1>

      {Songs.map((song, index) => (
        <div key={song._id} className="flex flex-col gap-2 py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">{song.title}</p>
              <p className="opacity-50">{song.artist}</p>
            </div>

            <button
              onClick={() => handlePlayPause(index)}
              className="cursor-pointer outline-none hover:scale-110 active:scale-95 duration-200"
            >
              {isPlaying && currentSongIndex === index ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
          </div>

          {/* Audio Player */}
          <audio
            ref={(el) => (audioRefs.current[index] = el)}
            src={song.audio}
            onTimeUpdate={(e) => {
              const slider = document.getElementById(`seek-${index}`);
              if (slider) {
                slider.value = e.target.currentTime;
                slider.max = e.target.duration || 0;
              }
            }}
          ></audio>

          {/* Progress Bar */}
          <input
            id={`seek-${index}`}
            type="range"
            min="0"
            defaultValue="0"
            className="w-full cursor-pointer"
            onChange={(e) => handleSeek(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

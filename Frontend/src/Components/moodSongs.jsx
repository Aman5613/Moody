import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const MoodSongs = () => {
  const [isPlaying, setisPlaying] = useState(0);

  const togglePlayPause = () => {

    setisPlaying(!isPlaying);
  }

  return (
    <div className="px-50 mt-5">
      <h1 className="font-bold text-2xl mb-5">Recommended Songs</h1>
      <div className="flex justify-between items-center">
        <div className="">
          <p className="song_title text-xl">Laviator</p>
          <p className="song_artist opacity-50">Jon Doe</p>
        </div>
        <button onClick={togglePlayPause} className="cursor-pointer hover:scale-110 active:scale-95 duration-200">{isPlaying  ? <FaPause /> : <FaPlay />}</button>
      </div>
    </div>
  );
};

export default MoodSongs;

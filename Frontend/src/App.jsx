import React, { useState } from "react";
import FaceExpression from "./Components/getExpression";
import MoodSongs from "./Components/moodSongs";
import Admin from "./Components/Admin";


const App = () => {
  const[Songs, setSongs] = useState([]);
  const [openAdmin, setopenAdmin] = useState(false)
  
  return (
    <div className="relative w-screen px-3 py-2 min-h-screen">
      <button
        onClick={() => setopenAdmin(!openAdmin)}
        className=" absolute top-2 right-2 flex text-white cursor-pointer font-bold px-3 py-2 rounded-md bg-teal-800 hover:bg-teal-700 active:scale-97"
      >
        Admin
      </button>
      <FaceExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
      {
        openAdmin && <Admin close={() => setopenAdmin(false)}/>
      }
    </div>
  );
};

export default App;

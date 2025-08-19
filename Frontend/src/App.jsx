import React, { useState } from "react";
import FaceExpression from "./Components/getExpression";
import MoodSongs from "./Components/moodSongs";

const App = () => {
  const[Songs, setSongs] = useState([]);
  
  return (
    <div>
      <FaceExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </div>
  );
};

export default App;

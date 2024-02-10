import "./App.css";
import { useState, useEffect } from "react";
import { boardWidth, startState } from "./constants";
import GameCell from "./GameCell";

function App() {
  const [state, setState] = useState(startState())


  console.log(state);

  return (
    <div className="bg-green-700 h-[100vh] flex justify-center items-center">
      <div className={"bg-green-400 h-[60vmin] w-[60vmin] grid cols-" + boardWidth}>
        {state.map((arr, yIndex) => arr.map((value, xIndex) => (
          <GameCell value={value} />
        ) ))}
      </div>
    </div>
  );
}

export default App;

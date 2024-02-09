import './App.css';
import GameCell from './GameCell';
import { useState, useEffect } from 'react';

function App() {
  const [boardWidth, setBoardWidth] = useState(7);
  const [state, setState] = useState([]);
  

  useEffect(() => {
    let newState = []
    for (let i = 0; i < boardWidth * boardWidth; i++) {
      newState.push(0);
    }
    newState[3] = 1
    setState(newState);
  }, [boardWidth]);



  return (
    <div className='bg-green-700 h-[100vh] flex justify-center items-center'>
      <div className={"bg-green-400 h-[60vmin] w-[60vmin] grid cols-" + boardWidth}>
        {state.map((value, index) => (
          <GameCell value={value} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
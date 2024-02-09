import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [boardWidth, setBoardWidth] = useState(9);
  const [state, setState] = useState([]);

  useEffect(() => {
    let newState = []
    for (let i = 0; i < boardWidth * boardWidth; i++) {
      newState.push(i);
    }
    setState(newState);
  }, [boardWidth]);


  return (
    <div className='bg-green-700 h-[100vh] flex justify-center items-center'>
      <div className={`bg-green-400 h-[60vmin] w-[60vmin] grid grid-cols-${boardWidth}`}>
        {[...Array(boardWidth * boardWidth)].map((_, index) => (
          <div key={index} className={index % 2 === 0 ? "bg-green-500 flex justify-center items-center" : "bg-green-400 flex justify-center items-center"}>
            {state[index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
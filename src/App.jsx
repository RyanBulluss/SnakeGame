import "./App.css";
import { useState, useEffect } from "react";
import { boardWidth, startState, startDirection, snakeStartPosition} from "./constants";
import GameCell from "./GameCell";

function App() {
  const [state, setState] = useState(startState());
  const [direction, setDirection] = useState(startDirection);
  const [snake, setSnake] = useState([snakeStartPosition])
  
  useEffect (() => {
    moveSnake(); 
  }, [])

  function updateState(oldSnake) {
    const newState = state;
    snake.forEach((arr) => {
      state[arr[0]][arr[1]] = 1;
    })
    newState[oldSnake[0]][oldSnake[1]] = 0;
    setState(newState)
  }
  
  function moveSnake() {
    const newSnake = snake;
    switch (direction) {
      case "UP":
        snake.unshift([snake[0][0] - 1, snake[0][1]])
        break;
      case "DOWN":
        snake.unshift([snake[0][0] + 1, snake[0][1]])
        break;
      case "LEFT":
        snake.unshift([snake[0][0], snake[0][1] - 1])
        break;
      case "RIGHT":
        snake.unshift([snake[0][0], snake[0][1] + 1])
        break;
    }
    const oldSnake = newSnake.pop();
    setSnake(newSnake);
    updateState(oldSnake);
    console.log(snake); 
  }

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

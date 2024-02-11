import "./App.css";
import { useState, useEffect } from "react";
import {
  boardWidth,
  startState,
  startDirection,
  snakeStartPosition,
  boundaries,
  snakeStartLength,
} from "./constants";
import GameCell from "./GameCell";

function App() {
  const [state, setState] = useState(startState());
  const [direction, setDirection] = useState(startDirection);
  const [snake, setSnake] = useState(snakeStartPosition);
  const [snakeLength, setSnakeLength] = useState(snakeStartLength);
  const [render, setRender] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(0);

  // Makes every snake coord to be a 1 and deletes the tail once moved
  function renderSnake(oldPosition) {
    
    

    setState(s => {
      const newState = [...s];
      snake.forEach((arr) => {
        newState[arr[0]][arr[1]] = 1;
      });
      if (!!oldPosition) newState[oldPosition[0]][oldPosition[1]] = 0;
      return newState;
    })
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "w":
          setDirection("UP");
          break;
        case "s":
          setDirection("DOWN");
          break;
        case "a":
          setDirection("LEFT");
          break;
        case "d":
          setDirection("RIGHT");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // If not playing stops the game, otherwise moves the snake 5 times per second
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      moveSnake();
      setRender((prev) => !prev);
    }, 100);

    return () => clearInterval(interval);
  }, [snake, direction, playing]);

  function gameOver() {
    setPlaying(false);
  }

  // Based on the direction adds the new value to the snake array
  function moveSnake() {
    const newPosition = checkNextPosition();
    let oldPosition;
    const newSnake = [newPosition, ...snake];
    if (snake.length - 1  >= snakeLength) {oldPosition = newSnake.pop()};
    renderSnake(oldPosition);
    console.log(newPosition)
    if (OutOfBounds(newPosition)) return gameOver();
    console.log(state)
    setSnake(newSnake);
  }

  function checkNextPosition() {
    let position = [...snake[0]];
    switch (direction) {
      case "UP":
        position[0]--;
        break;
      case "DOWN":
        position[0]++;
        break;
      case "LEFT":
        position[1]--;
        break;
      case "RIGHT":
        position[1]++;
        break;
    }
    return position;
  }

  function OutOfBounds(newPosition) {
    let result = false;
    if (
      newPosition[0] >= boardWidth ||
      newPosition[1] >= boardWidth ||
      newPosition[0] < 0 ||
      newPosition[1] < 0
    )
      result = true;
    return result;
  }

  return (
    <div className="bg-green-700 h-[100vh] flex flex-col justify-center gap-8 items-center">
      <h2 className="text-2xl font-semibold">Score: {score}</h2>
      <div
        className={"bg-green-400 h-[60vmin] w-[60vmin] grid cols-" + boardWidth}
      >
        {state.map((arr, yIndex) =>
          arr.map((value, xIndex) => <GameCell value={state[yIndex][xIndex]} />)
        )}
      </div>
      <button className="bg-gray-700 text-white p-2 rounded-xl">
        Restart Game
      </button>
    </div>
  );
}

export default App;

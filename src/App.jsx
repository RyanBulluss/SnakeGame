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

  // Makes every snake coord to be a 1 and deletes the tail once moved
  function updateState(oldSnake) {
    const newState = state;
    snake.forEach((arr) => {
      state[arr[0]][arr[1]] = 1;
    });
    newState[oldSnake[0]][oldSnake[1]] = 0;
    setState(newState);
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
        default:
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
    }, 200);

    return () => clearInterval(interval);
  }, [snake, direction, playing]);

  function gameOver() {
    setPlaying(false);
  }

  // Based on the direction adds the new value to the snake array
  function moveSnake() {
    const newSnake = snake;
    switch (direction) {
      case "UP":
        if (snake[0][0] - 1 < boundaries.top) {
          return gameOver();
        } else {
          newSnake.unshift([snake[0][0] - 1, snake[0][1]]);
        }
        break;
      case "DOWN":
        if (snake[0][0] + 1 >= boundaries.bottom) {
          return gameOver();
        } else {
          newSnake.unshift([snake[0][0] + 1, snake[0][1]]);
        }
        break;
      case "LEFT":
        if (snake[0][0] - 1 < boundaries.left) {
          return gameOver();
        } else {
          newSnake.unshift([snake[0][0], snake[0][1] - 1]);
        }
        break;
      case "RIGHT":
        if (snake[0][0] + 1 >= boundaries.right) {
          return gameOver();
        } else {
          newSnake.unshift([snake[0][0], snake[0][1] + 1]);
        }
        break;
    }
    if (
      newSnake[0][1] >= boundaries.right ||
      newSnake[0][1] < boundaries.left ||
      newSnake[1][0] >= boundaries.bottom - 1 ||
      newSnake[1][0] < boundaries.top + 1
    ) {
      gameOver();
    } else {
      const oldSnake = newSnake.pop();
      setSnake(newSnake);
      updateState(oldSnake);
    }
  }

  return (
    <div className="bg-green-700 h-[100vh] flex justify-center items-center">
      <div
        className={"bg-green-400 h-[60vmin] w-[60vmin] grid cols-" + boardWidth}
      >
        {state.map((arr, yIndex) =>
          arr.map((value, xIndex) => <GameCell value={state[yIndex][xIndex]} />)
        )}
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import {
  boardWidth,
  startState,
  startDirection,
  snakeStartPosition,
  snakeStartLength,
  startScore,
  gameSpeed
} from "./constants";
import GameCell from "./GameCell";

function App() {
  const [state, setState] = useState(startState());
  const [direction, setDirection] = useState(startDirection);
  const [snake, setSnake] = useState(snakeStartPosition);
  const [snakeLength, setSnakeLength] = useState(snakeStartLength);
  const [render, setRender] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(startScore);

  // Makes every snake coord to be a 1 and deletes the tail once moved
  function renderSnake(oldPosition) {
    setState((s) => {
      const newState = [...s];
      snake.forEach((arr) => {
        newState[arr[0]][arr[1]] = 1;
      });
      if (!!oldPosition) newState[oldPosition[0]][oldPosition[1]] = 0;
      return newState;
    });
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
    }, gameSpeed);

    return () => clearInterval(interval);
  }, [snake, direction, playing]);

  function gameOver() {
    setPlaying(false);
  }

  function moveSnake() {
    const newPosition = checkNextPosition();

    let oldPosition;
    const newSnake = [newPosition, ...snake];
    if (snake.length - 1 >= snakeLength) {
      oldPosition = newSnake.pop();
    }
    renderSnake(oldPosition);
    if (OutOfBounds(newPosition)) return gameOver();
    if (hittingSelf(newPosition)) return gameOver();
    hittingFood(newPosition);

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

  function restartGame() {
    setState(startState())
    setScore(startScore);
    setDirection(startDirection);
    setSnake(snakeStartPosition);
    setSnakeLength(snakeStartLength);
    setPlaying(true);
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function spawnFood() {
    let location;
    while (!location) {
      let n1 = rng(boardWidth);
      let n2 = rng(boardWidth);
      if (state[n1][n2] === 0) {
        location = [n1, n2];
      }
    }
    setState((s) => {
      let newState = [...s];
      newState[location[0]][location[1]] = 2;
      return newState;
    });
  }

  function hittingFood(newPosition) {
    if (state[newPosition[0]][newPosition[1]] === 2) {
      setScore(score + 1);
      setSnakeLength(snakeLength + 1);
      spawnFood();
    }
  }

  function hittingSelf(newPosition) {
    let result = false;
    if (state[newPosition[0]][newPosition[1]] === 1) result = true;
    return result;
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
      <button onClick={() => restartGame()} className="bg-gray-700 text-white p-2 rounded-xl">
        Restart Game
      </button>
    </div>
  );
}

export default App;

const gameSpeed = 50;
const boardWidth = 24;
const snakeStartLength = 3;
const snakeStartPosition = [
  [0, 1],
  [0, 0],
];
const appleStartPosition = [5, 5];
const startScore = 0;

const startState = () => {
  let newState = [];
  for (let i = 0; i < boardWidth; i++) {
    let arr = [];
    for (let j = 0; j < boardWidth; j++) {
      arr.push(0);
    }
    newState.push(arr);
  }
  // These were causing bugs
  newState[snakeStartPosition[0][0]][snakeStartPosition[0][1]] = 1;
  newState[snakeStartPosition[1][0]][snakeStartPosition[1][1]] = 1;
  newState[appleStartPosition[0]][appleStartPosition[1]] = 2;
  newState[appleStartPosition[0]][appleStartPosition[1] + 1] = 2;
  newState[appleStartPosition[0] + 1][appleStartPosition[1] + 1] = 2;
  newState[appleStartPosition[0] + 1][appleStartPosition[1]] = 2;
  newState[appleStartPosition[0]][appleStartPosition[1] + 2] = 2;
  return newState;
};

const startDirection = "RIGHT";

export {
  startState,
  boardWidth,
  snakeStartPosition,
  appleStartPosition,
  startDirection,
  snakeStartLength,
  startScore,
  gameSpeed,
};

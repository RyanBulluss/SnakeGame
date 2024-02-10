const boardWidth = 12;
const snakeStartPosition = [0, 0];
const appleStartPosition = [5, 5];

const startState = () => {
  let newState = [];
  for (let i = 0; i < boardWidth; i++) {
    let arr = [];
    for (let j = 0; j < boardWidth; j++) {
      arr.push(0);
    }
    newState.push(arr);
  }
  newState[snakeStartPosition[0]][snakeStartPosition[1]] = 1;
  newState[appleStartPosition[0]][appleStartPosition[1]] = 2;
  return newState;
};

const startDirection = "RIGHT";

export {
  startState,
  boardWidth,
  snakeStartPosition,
  appleStartPosition,
  startDirection,
};

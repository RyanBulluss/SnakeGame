const boardWidth = 12;
const snakeStartLength = 2;
const snakeStartPosition = [[6, 6], [7, 6]];
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
  newState[snakeStartPosition[0][0]][snakeStartPosition[0][1]] = 1;
  newState[snakeStartPosition[1][0]][snakeStartPosition[1][1]] = 1;
  newState[appleStartPosition[0]][appleStartPosition[1]] = 2;
  return newState;
};


const boundaries = {
  top: 0,
  bottom: boardWidth,
  left: 0,
  right: boardWidth
}

const startDirection = "DOWN";

export {
  startState,
  boardWidth,
  snakeStartPosition,
  appleStartPosition,
  startDirection,
  boundaries,
  snakeStartLength
};

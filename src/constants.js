

const boardWidth = 12;
const startState = () => {
    let newState = [];
    for (let i = 0; i < boardWidth; i++) {
        let arr = [];
        for (let j = 0; j < boardWidth; j++) {
            arr.push(0)
        }
        newState.push(arr)
    }
    return newState;
}

const snakeStartPosition = [0,0];
const appleStartPosition = [6,6];


export { startState, boardWidth, snakeStartPosition, appleStartPosition };
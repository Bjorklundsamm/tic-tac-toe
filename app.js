const readline = require("readline");
// Define board layout
let consoleGrid = `
   --- --- ---
  | 1 | 2 | 3 |
  |---|---|---|
  | 4 | 5 | 6 |
  |---|---|---|
  | 7 | 8 | 9 |
   --- --- ---
`;
// Define positions in console
const coordinates = {
  '1': 20,
  '2': 24,
  '3': 28,
  '4': 52,
  '5': 56,
  '6': 60,
  '7': 84,
  '8': 88,
  '9': 92
};

// Generate new game
let newGame = consoleGrid;
let state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let player = 'x';

// Define input methods
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const updateState = (answer) => {
  const num = Number(answer) - 1;
  const array = Math.floor(num / 3);
  const index = num % 3;
  if (typeof state[array][index] !== 'number') {
    console.log('No cheating! You\'ve forfeited your turn!');
  } else {
    state[array][index] = player;
    let loc = coordinates[answer];
    newGame = newGame.replaceAt(loc, player);
  }
}



// Monitor instance and verify Win Conditions
const onChange = () => {
  interface.question(`${newGame}\n${player}'s turn (enter your desired space): `, (answer) => {
    updateState(answer);
    const isWin = checkWin(player);
    if (isWin) {
      console.log(`${player} has won! New game start`);
      newGame = consoleGrid;
      state = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      player = 'o';
    }
    if (player === 'x') {
      player = 'o';
    } else {
      player = 'x';
    }
    onChange();
  });
}

// Verify win conditions
var checkWin = (player) => {
  isRowWin = checkAllRows(player);
  isColWin = checkAllCols(player);
  isMajorDiagWin = checkMajorDiag(player);
  isMinorDiagWin = checkMinorDiag(player);
  return isRowWin || isColWin || isMajorDiagWin || isMinorDiagWin;
}
// Win by row
var checkRow = (row, player) => {
  counter = 0;
  row.forEach((val) => {
    if (val === player) {
      counter++;
    }
  });
  return counter === 3;
}
var checkAllRows = (player) => {
  var result = false;
  state.forEach((row) => {
    result = checkRow(row, player) || result;
  });
  return result;
}
// Win by column
var checkCol = (col, player) => {
  counter = 0;
  state.forEach((row) => {
    if (row[col] === player) {
      counter++;
    }
  });
  return counter === 3;
}
var checkAllCols = (player) => {
  var result = false;
  for (var i = 0; i < state.length; i++) {
    result = checkCol(i, player) || result;
  }
  return result;
}
// Win by diag
var checkMajorDiag = (player) => {
  var counter = 0;
  for (var i = 0; i < state.length; i++) {
    if (state[i][i] === player) {
      counter++;
    }
  }
  return counter === 3;
}
var checkMinorDiag = (player) => {
  var counter = 0;
  var row = 0;
  for (var i = 2; i >= 0; i--) {
    if (state[row][i] === player) {
      counter++;
    }
    row++;
  }
  return counter === 3;
}

onChange();
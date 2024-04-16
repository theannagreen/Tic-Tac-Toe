  /*----- constants -----*/
const COLOR_LOOKUP = {
    '1':  'purple',
    '-1': 'orange',
    'null': 'white',
};

const winningCombos = [
[0, 1, 2], // top row
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6] // bottom 
];
  /*----- state variables -----*/ 
let board; // 
let turn; // 1 or -1
let winner; 

  /*----- cached elements  -----*/
const message = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

  /*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);

  /*----- functions -----*/
initialize();

function initialize() {
    board = new Array(9).fill(null);
    turn = 1;
    winner = null;

    render(); //transfer inital state to the DOM 
    message.innerHTML = "";
    message.innerHTML = "Player O's turn";

}
// update impacted state the call render()
function handleMove(event) {
    const squareId = event.target.id; // when a square is clicked we get the ID of the square
    const squareIndex = parseInt(squareId.replace('square-', '')); // extract the number part from the square's id to get this index
  // here check if the square index is not a number of if the square is already filled or if winner
    if (isNaN(squareIndex) || board[squareIndex] || winner) {
      return;
    }

//update game: if the square is valid to place a move the  board will update at that index with the current player's move
board[squareIndex] = turn;
winner = getWinner();
turn *= -1;
// render the updated state of the game to reflect the move
render();
}

function getWinner() {
    for (let winArr of winningCombos) {
        if (Math.abs(board[winArr[0]] + board [winArr[1]] + board[winArr[2]]) === 3);
          return turn;
  }
  if (board.includes(null)) return null; 
  return 'T';
}

function render () {
    renderBoard();
    renderMessage();
    playAgainBtn.disabled = !winner;

}

function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        const square = document.getElementById(`square-${i}`);
        square.style.backgroundColor = COLOR_LOOKUP[board[i]];
        square.className = !board[i] ? 'avail' : '';
        square.textContent = board[i] ? (board[i] === 1 ? 'X' : 'O') : '' // display X or O in suqare
    }
}

function renderMessage() {
    if (winner === `T`) {
        message.textContent = "It's a tie! Try again!";
    } else if (winner) {
        message.textContent = `Winner: ${COLOR_LOOKUP[winner].toUpperCase()}`;
      document.getElementById('winning-message').style.display = 'block';
      document.getElementById('current-player').textContent = '';
      
    } else {
        message.textContent = `Current-player: ${COLOR_LOOKUP[turn].toUpperCase()}`;
        document.getElementById('winning-message').style.display = 'none';
       document.getElementById('current-player').textContent = `Current player: ${turn === 1 ? 'X' : '0'}`;
    }
}
function renderBoard() {
    board.forEach(function(sq, idx) {
        const squareEl = document.getElementById(`square-${idx}`);
        squareEl.style.backgroundColor = COLOR_LOOKUP[sq];
        squareEl.className = !sq ? 'avail' : '';
    });
}
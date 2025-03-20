const gameBoard = (function board() {
    let board = [[],
                 [],
                 []];
    
    const insertPiece = function(player, position) {
        if (board[position[0]][position[1]] == 'x' || board[position[0]][position[1]] == 'o')
        {
            return false;
        }
        else
        {
            // if square not occupied put in naught or cross and return true
            board[position[0]][position[1]] = player.getPiece();
            player.updateMoves(position);
            return true;
        }
    }
   
    const checkBoardPosition = (position) => board[position[0]][position[1]];
    const reset = ()=> board = [[],
    [],
    []];

    return {board, insertPiece, checkBoardPosition,reset};
})();


function createPlayer(pieceType, playerNumber) {
    let piece = pieceType;
    let moves = [];
    let number = playerNumber;
    let name = "";

    const updateMoves = (position)=> moves.push(position);
    const getPiece = () => piece;
    const checkForWin = function() {
        if (moves.length >= 3)
        {
            let row1Counter = 0
            let row2Counter = 0
            let row3Counter = 0

            let column1Counter = 0
            let column2Counter = 0
            let column3Counter = 0

            let diagonalLeftRightCounter = 0;
            let diagonalRightLeftCounter = 0;

            for (let move of moves)
            {
                if (move[0] == 0)
                {
                    if (move[1] == 0)
                    {
                        diagonalLeftRightCounter++;
                        column1Counter++;

                    }
                    if (move[1] == 1)
                    {
                        column2Counter++;
                    }
                    if (move[1] == 2)
                    {
                        column3Counter++;
                        diagonalRightLeftCounter++;
                    }
                    row1Counter++;
                }
                if (move[0] == 1)
                {
                    if (move[1] == 0)
                    {
                            column1Counter++;
                    }
                    if (move[1] == 1)
                    {
                        diagonalLeftRightCounter++;
                        diagonalRightLeftCounter++;
                        column2Counter++;
                    }
                    if (move[1] == 2)
                    {
                            column3Counter++;
                    }
                    row2Counter++;
                }
                if (move[0] == 2)
                {
                    if (move[1] == 0)
                    {
                        diagonalRightLeftCounter++;
                        column1Counter++;
                    }
                    if (move[1] == 1)
                    {
                        column2Counter++;
                    }
                    if (move[1] == 2)
                    {
                        diagonalLeftRightCounter++;
                        column3Counter++;
                    }
                    row3Counter++;
                }
            }

            if (row1Counter == 3)
            {
                return true;
            }
            if (row2Counter == 3)
            {
                return true;
            }
            if (row3Counter == 3)
            {
                return true;
            }
            if (column1Counter == 3)
            {
                return true;
            }
            if (column2Counter == 3)
            {
                return true;
            }
            if (column3Counter == 3)
            {
                return true;
            }
            if (diagonalLeftRightCounter == 3)
            {
                return true;
            }
            if (diagonalRightLeftCounter == 3)
            {
                return true;
            }
            return false;
        }
    }
    const getPlayerNumber = () => number;
    const updatePlayerName = (input) => name = input;
    const getPlayerName = ()=> name;
    const reset = function() {
        piece = pieceType;
        moves = [];
        number = playerNumber;
        name = "";
    };
    return {updateMoves,getPiece, getPlayerNumber, checkForWin, updatePlayerName,getPlayerName, reset, piece, name,moves};
}


function addEventButtonEventListeners(button){
    button.addEventListener('click', eventHandler);
};


function addPieceToBoard(buttonClicked){
    switch (buttonClicked) {
        case topLeftButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [0,0]);
        case topMiddleButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [0,1]);
        case topRightButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [0,2]);
        case middleLeftButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [1,0]);
        case middleButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [1,1]);
        case middleRightButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [1,2]);
        case bottomLeftButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [2,0]);
        case bottomMiddleButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [2,1]);
        case bottomRightButton:
            return gameBoard.insertPiece(game.getCurrentPlayersTurn(), [2,2]);
    }
}
function removePiecesFromScreen()
{
    topLeftButton.innerHTML = "";
    topMiddleButton.innerHTML = "";
    topRightButton.innerHTML = "";
    middleLeftButton.innerHTML = "";
    middleButton.innerHTML = "";
    middleRightButton.innerHTML = "";
    bottomLeftButton.innerHTML = "";
    bottomMiddleButton.innerHTML = "";
    bottomRightButton.innerHTML = "";

}
function addPieceToScreen(event) {
 
    // if a new game piece is added to the board update the screen and switch turns
    if (addPieceToBoard(this))
    {
        this.innerHTML = `${game.getCurrentPlayersTurn().getPiece()}`;
        if (game.getCurrentPlayersTurn().checkForWin())
        {
            game.setGameWinner();
            removeAllEventListeners();
            displayWinner(game.getCurrentPlayersTurn())
            console.log(`${game.getGameWinner().getPiece()} wins!`)
        }
        else {
            game.switchPlayerTurn();
        }
        console.log(gameBoard.board)
    }

};
const eventHandler = function(event)
{
    addPieceToScreen.call(this, event);
}
function addAllEventListeners(){
    addEventButtonEventListeners(topLeftButton);
    addEventButtonEventListeners(topMiddleButton);
    addEventButtonEventListeners(topRightButton);
    addEventButtonEventListeners(middleLeftButton);
    addEventButtonEventListeners(middleButton);
    addEventButtonEventListeners(middleRightButton);
    addEventButtonEventListeners(bottomLeftButton);
    addEventButtonEventListeners(bottomMiddleButton);
    addEventButtonEventListeners(bottomRightButton);

    p1textbutton.addEventListener('click', function(){ updatePlayerName(player1)});
    p2textbutton.addEventListener('click', ()=> updatePlayerName(player2));
    startRestButton.addEventListener('click', ()=> resetGame());
}

function removeAllEventListeners() {
    topLeftButton.removeEventListener('click', eventHandler);
    topMiddleButton.removeEventListener('click', eventHandler);
    topRightButton.removeEventListener('click', eventHandler);
    middleLeftButton.removeEventListener('click', eventHandler);
    middleButton.removeEventListener('click', eventHandler);
    middleRightButton.removeEventListener('click', eventHandler);
    bottomLeftButton.removeEventListener('click', eventHandler);
    bottomMiddleButton.removeEventListener('click', eventHandler);
    bottomRightButton.removeEventListener('click', eventHandler);
}

function displayWinner(winningPlayer)
{
    const display = document.querySelector(".display");
    let pieceString = "";
    if (winningPlayer.getPiece() == 'x')
    {
        pieceString = "Crosses";
    }
    else if (winningPlayer.getPiece() == 'o')
    {
        pieceString = "Naughts";
    }
    display.innerHTML = `${winningPlayer.getPlayerName()} wins playing ${pieceString}`;
}
function displayReset()
{
    const display = document.querySelector(".display");
    display.innerHTML = '';
}
const player1 = createPlayer('x', 1);
const player2 = createPlayer('o', 2);


const topLeftButton = document.querySelector(".top-left");
const topMiddleButton = document.querySelector(".top-middle");
const topRightButton = document.querySelector(".top-right");

const middleLeftButton = document.querySelector(".middle-left");
const middleButton = document.querySelector(".middle");
const middleRightButton = document.querySelector(".middle-right");

const bottomLeftButton = document.querySelector(".bottom-left");
const bottomMiddleButton = document.querySelector(".bottom-middle");
const bottomRightButton = document.querySelector(".bottom-right");


const game = (function gameController(player1, player2) {
    let currentPlayerTurn = player1;
    let gameWinner = null;
    const switchPlayerTurn = function() {
        if (gameWinner == null)
        {
            if (getCurrentPlayersTurn() == player1){
                currentPlayerTurn = player2;
            }
            else if (getCurrentPlayersTurn() == player2){
                currentPlayerTurn = player1;
            }
        }
    };
    const getCurrentPlayersTurn = () => currentPlayerTurn;
    const setGameWinner = () => gameWinner = currentPlayerTurn;
    const getGameWinner = () => gameWinner;

    const reset = function() {
        currentPlayerTurn = player1;
        gameWinner = null;
    }

    return {switchPlayerTurn, getCurrentPlayersTurn, setGameWinner, getGameWinner,reset, currentPlayerTurn};

})(player1, player2);



const out = document.querySelector(".out");
const player1Name = document.querySelector('#p1Name');
const player2Name = document.querySelector('#p2Name');
const p1textbutton = document.querySelector('.p1NameSubmit');
const p2textbutton = document.querySelector('.p2NameSubmit');
const startRestButton = document.querySelector('.reset');


addAllEventListeners();

function updatePlayerName(player)
{
    if (player == player1)
    {
        player1.updatePlayerName(player1Name.value)
    }
    else if (player == player2)
    {
        player2.updatePlayerName(player2Name.value)
    }
}

function resetGame()
{
    removeAllEventListeners();
    addAllEventListeners();
    removePiecesFromScreen();
    game.reset();
    gameBoard.reset();
    player1.reset();
    player2.reset();
    displayReset();
}

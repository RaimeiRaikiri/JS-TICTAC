const gameBoard = (function board() {
    let board = [[],
                 [],
                 []];
    
    const insertPiece = function(player, position) {
        if (this.board[position[0]][position[1]] == 'x' || this.board[position[0]][position[1]] == 'o')
        {
            return false;
        }
        else
        {
            // if square not occupied put in naught or cross and return true
            this.board[position[0]][position[1]] = player.getPiece();
            player.updateMoves(position);
            return true;
        }
    }
   
    const checkBoardPosition = (position) => board[position[0]][position[1]];
    
    return {board, insertPiece, checkBoardPosition};
})();


function createPlayer(pieceType, playerNumber) {
    let piece = pieceType;
    let moves = [];
    let number = playerNumber;

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
    return {updateMoves,getPiece, getPlayerNumber, checkForWin, piece};
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
    display.innerHTML = `Player ${winningPlayer.getPlayerNumber()} wins playing ${pieceString}`;
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


    return {switchPlayerTurn, getCurrentPlayersTurn, setGameWinner, getGameWinner, currentPlayerTurn};

})(player1, player2);


addAllEventListeners();



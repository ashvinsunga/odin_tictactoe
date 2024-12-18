// Module pattern, since the constructor will only be used once
const Gameboard = (() => {
    
    let gameboard  = ["","","","","","","","",""]

    const render = () => {
        
        let DOMboard = "";
        gameboard.forEach((square, index) => {
            DOMboard += `<div class="square" id="square-${index}"> ${square} </div>`
        })
        // improved
        document.getElementById('board').innerHTML = DOMboard;
        const squares = document.getElementsByClassName('square')
        Array.from(squares).forEach(square =>{
            square.addEventListener('click', GameController.handleClick)
        })
    }
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameBoard = () => gameboard;

    return {
        render,
        update,
        getGameBoard
    }
})();

// Factory function for creating players
//Improved
const createPlayer = (name, symbol) => {
    return {
        name,
        symbol,
    }
}

const GameController = (() => {
    let players = [];
    // improved
    let currentPlayerIndex;
    // improved 
    let isGameOver;

    const start = () => {
        players = [
            createPlayer(document.getElementById('player1').value, "✓"),
            createPlayer(document.getElementById('player2').value, "O")
        ]
        currentPlayerIndex = 0;
        isGameOver = false;
        Gameboard.render();

    }

    const handleClick = (e) => {
        if (isGameOver){
            return;
        }
        let index = parseInt(e.target.id.split("-")[1]);
        if (Gameboard.getGameBoard()[index] !== "")
            return;

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        Gameboard.update (index, players[currentPlayerIndex].symbol);

        if (winnerConfirmed(Gameboard.getGameBoard())){
            isGameOver = true;
            displayController.displayMessage(`${players[currentPlayerIndex].name} won the GAME!`)   
        } else if (tieConfirmed(Gameboard.getGameBoard())){
            isGameOver = true;
            displayController.displayMessage(`It's tie. Please 'PLAY' again`)
        }


    }

    const restart = () => {
        for (let i = 0; i < 9; i++){
            Gameboard.update(i, "")
        }
        document.getElementById('message').innerHTML = ""
        isGameOver = false;
    }
    return {
        start,
        handleClick,
        restart
    }
})();

displayController = (() => {
    const displayMessage = (message) => {
       document.getElementById('message').innerHTML = message
    }

    return {
        displayMessage
    }
})();

    function winnerConfirmed(board) {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            console.log(winningCombinations[i])
            if (board[a] && board[a] === board [b] && board[a] === board [c]){
                return true;
            }
        }
        return false
    }

    function tieConfirmed(board){
        return board.every(cell => cell !=="")
    }


const restartButton = document.getElementById('restart-button')
restartButton.addEventListener('click', () => {
    GameController.restart()
})

const startButton = document.getElementById('start-button')
startButton.addEventListener('click',  () => {
    GameController.start()
})
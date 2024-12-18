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

    return {
        render,
    }
})();

// Factory function for creating players
//Improved
const createPlayer = (name, symbol) => {
    return {
        name,
        symbol
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
        console.log(e.target.id)
    }
    return {
        start,
        handleClick
    }
})()

const startButton = document.getElementById('start-button')
startButton.addEventListener('click',  () => {
    GameController.start()
})
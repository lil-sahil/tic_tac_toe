// Player Factory
const createPlayer = (marker) => {
    const getMarker = () => marker;
    return {getMarker}
}


// Gameboard Module
const gameBoard = (() => {
    const boxes = document.querySelectorAll('.box');

    let gameArray = ['','','','','','','','',''];

    const setGameArray = () => {
        gameArray = ['','','','','','','','',''];
    }
    

    // Place marker
    const placemarker = (index, marker) => {
        gameArray[index] = marker;
        displayMarkers();
    };
    
    // display current markers
    const displayMarkers = () => { 
        for (let index = 0; index < gameArray.length; index++){
            
            boxes.forEach(box => {
                if (parseInt(box.id.split('-')[1]) === index){
                    box.innerHTML = gameArray[index];
                }        
            });
        } 
    };


    return { placemarker , setGameArray, displayMarkers};

})();


// game controller

const gameController = (() => {

    // Initialize Players
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');

    // Round Logic
    let pickNumber = 1;

    // Get gameboard elements
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            let index = parseInt((e.target.id).split('-')[1]);
            gameBoard.placemarker(index, playerX.getMarker());
        });
    });
    



})();

// Reset Game
const resetButton = (() => {
    const resetButton = document.querySelector('.reset-button');

    resetButton.addEventListener('click', () => {
        gameBoard.setGameArray()
        gameBoard.displayMarkers();
    })

})();
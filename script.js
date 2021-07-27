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

    const getCurrentGameArray = () => {
        return gameArray;
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


    return { placemarker , setGameArray, displayMarkers, getCurrentGameArray};

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

            // Player Pick
            let index = parseInt((e.target.id).split('-')[1]);
            gameBoard.placemarker(index, playerX.getMarker());

            // Computer Pick
            gameBoard.placemarker(aiController.randomPlay(),playerO.getMarker());
        });
    });


})();

// Reset Game
const resetButton = (() => {
    const resetButton = document.querySelector('.reset-button');

    resetButton.addEventListener('click', () => {
        gameBoard.setGameArray();
        gameBoard.displayMarkers();
    });

})();

// AI Controller

const aiController = (() => {
    
    // Pick the first availaible spot
    const randomPlay = () => {
        console.log(gameBoard.getCurrentGameArray());
        
        for (let [index, el] of gameBoard.getCurrentGameArray().entries()){
            if (el === ""){
                return index;
            };
        };   
    };

    return {randomPlay}
})();

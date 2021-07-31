// Player Factory
const createPlayer = (marker) => {
    const getMarker = () => marker;
    return {getMarker}
}


// Gameboard Module and Modal display
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

    const displayWinner = (message) => {
        const modal = document.querySelector('.modal');
        const winner = document.querySelector('.modal .winner')
        const outsideClick = document.querySelector('.modal');

        modal.style.display = 'flex';
        winner.innerHTML = `${message}`;

        outsideClick.addEventListener('click', e => {
            modal.style.display = 'none';
            gameController.resetGame();

        });
    };


    return { placemarker , setGameArray, displayMarkers, getCurrentGameArray, displayWinner};

})();


// game controller

const gameController = (() => {

    // Initialize Players
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');

    // Round Logic
    let pickNumber = 0;

    // Get gameboard elements
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('click', (e) => {

            // Player Pick
            let index = parseInt((e.target.id).split('-')[1]);
            gameBoard.placemarker(index, playerX.getMarker());
            pickNumber += 1;

            checkWinner(playerX.getMarker());

            // Computer Pick
            gameBoard.placemarker(aiController.randomPlay(),playerO.getMarker());

            if (checkWinner(playerX.getMarker()) !== true){
                checkWinner(playerO.getMarker());
                pickNumber += 1;
            };

            console.log(pickNumber);

            if ( (pickNumber === 10) && (checkWinner(playerX.getMarker()) !== true) && (checkWinner(playerO.getMarker()) !== true) ){
                gameBoard.displayWinner("Tie");
            };   
        });
    });

    // Determine if someone has won a game

    const checkWinner = (marker) => {

        let currentArray = gameBoard.getCurrentGameArray();
        let flag = 0;

        // let markerArray = [];

        // Winning Conditions
        let conditions = [
            [1,2,3],
            [1,4,7],
            [1,5,9],
            [3,6,9],
            [7,8,9],
            [3,5,7],
            [2,5,8]
        ]

        for (let i = 0; i < conditions.length; i++){
            for (let j = 0; j < conditions[i].length; j++){
                if ( currentArray[ ( conditions[i][j] ) - 1 ] === marker){
                    flag += 1;
                };
            };
            if (flag === 3){
                gameBoard.displayWinner(`Winner ${marker}`);
                return true;
            } else {
                flag = 0;
            };
        };


    };

    // Reset Game

    const resetGame = () => {
        gameBoard.setGameArray();
        gameBoard.displayMarkers();
        pickNumber = 0;
    }

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', resetGame);


    return { resetGame }
})();


// AI Controller

const aiController = (() => {
    
    // Pick the first availaible spot
    const randomPlay = () => {
        
        for (let [index, el] of gameBoard.getCurrentGameArray().entries()){
            if (el === ""){
                return index;
            };
        };   
    };

    return {randomPlay}
})();

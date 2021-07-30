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

        })
    }


    return { placemarker , setGameArray, displayMarkers, getCurrentGameArray, displayWinner};

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
            pickNumber += 1;

            checkWinner(playerX.getMarker());

            // Computer Pick
            gameBoard.placemarker(aiController.randomPlay(),playerO.getMarker());
            checkWinner(playerO.getMarker());
            pickNumber += 1;
        });
    });

    // Determine if someone has won a game

    const checkWinner = (marker) => {

        let currentArray = gameBoard.getCurrentGameArray();

        let markerArray = [];

        // Winning Conditions
        let conditions = [
            [`${marker}`,`${marker}`,`${marker}`,'','','','','',''].join(),
            [`${marker}`,'','',`${marker}`,'','',`${marker}`,'',''].join(),
            [`${marker}`,'','','',`${marker}`,'','','',`${marker}`].join(),
            ['','',`${marker}`,'','',`${marker}`,'','',`${marker}`].join(),
            ['','','','','','',`${marker}`,`${marker}`,`${marker}`].join(),
            ['','',`${marker}`,'',`${marker}`,'',`${marker}`,'',''].join(),
        ]

        for (let i = 0; i < currentArray.length; i++){
            if (currentArray[i] !== marker){
                markerArray.push('');
            }else {
                markerArray.push(`${marker}`);
            };
        };

        for (let i = 0; i < conditions.length; i++){
            
            if (markerArray.join() === conditions[i]){
                console.log(`Winner ${marker}`);
                gameBoard.displayWinner(`Winner ${marker}`);

            };
        };

    };

    // Reset Game

    const resetGame = () => {
        gameBoard.setGameArray();
        gameBoard.displayMarkers();
    }

    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', resetGame);


    return { resetGame }
})();

// // Reset Game
// const resetButton = (() => {
//     const resetButton = document.querySelector('.reset-button');

//     resetButton.addEventListener('click', () => {
//         gameBoard.setGameArray();
//         gameBoard.displayMarkers();
//     });

// })();

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

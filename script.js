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
    let aiDifficulty = "";

    // Get gameboard elements
    const boxes = document.querySelectorAll('.box');

    // Get AI difficulty
    const getDifficulty = () => {
        const selection = document.querySelector("select");
        return selection.options[selection.selectedIndex].value;
    }

    


    boxes.forEach(box => {
        box.addEventListener('click', (e) => {
            
            // Set AI diffculty only when at the begining of the game.
            if (pickNumber === 0){
                aiDifficulty = getDifficulty();
            }
            
            
            // Player Pick
            let index = parseInt((e.target.id).split('-')[1]);



            // Prevent from clicking twice vy looking at the index already used
            if (gameBoard.getCurrentGameArray()[index] === ""){
                
                gameBoard.placemarker(index, playerX.getMarker());
                pickNumber += 1;

                checkWinner(playerX.getMarker(), true);

                // Computer Pick

                // Prevent this section of the code from running if there are no more spots left in the grid
                
                if ( (pickNumber < 9) ){
                    gameBoard.placemarker(aiController[`${aiDifficulty}`](),playerO.getMarker());
                    
                    if (checkWinner(playerX.getMarker()) !== true){
                        checkWinner(playerO.getMarker(),true);
                        pickNumber += 1;
                    };
                }

                if ( (pickNumber === 9) && (checkWinner(playerX.getMarker()) !== true) && (checkWinner(playerO.getMarker()) !== true) ){
                    gameBoard.displayWinner("Tie");
                };                

            };

        });
    });

    // Determine if someone has won a game

    const checkWinner = (marker, display, currentArray = gameBoard.getCurrentGameArray()) => {

        
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
                if (display === true){
                    gameBoard.displayWinner(`Winner ${marker}`);
                }
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


    return { resetGame, checkWinner, playerO, playerX }
})();


// AI Controller

const aiController = (() => {
    
    // Pick the first availaible spot
    const firstSpotPlay = () => {
        
        for (let [index, el] of gameBoard.getCurrentGameArray().entries()){
            if (el === ""){
                return index;
            };
        };   
    };

    // AI Random Play
    const randomPlay = () => {
        let currentArray = gameBoard.getCurrentGameArray();

        let flag = true;

        while (true){
            let index = Math.floor(Math.random()*currentArray.length)

            if (currentArray[index] === ""){
                return index;
            };
        };

        
    };

    // AI Minimax Algorithim
    const smartPlay = () => {
        // Get current game array and set to currentArray
        let currentArray = gameBoard.getCurrentGameArray();
        
        const bestIndex = () => {
            let bestScore = -Infinity;
            let bestIndex;
            for (let i = 0; i < currentArray.length; i++){
                if (currentArray[i] === ""){
                    currentArray[i] = 'O';
                    
                    if (miniMax(currentArray, 3, true) > bestScore){
                        
                        bestIndex = i;
                    }
                    currentArray[i] = "";
                }
                
            }
            console.log(bestIndex);
            return bestIndex;
        }
        
        
        const miniMax = (array, depth, ismaximizing) => {
            
            let marker = '';

            if (ismaximizing === true){
                marker = 'O';
            }else {
                marker = 'X';
            };
            
            // base conditions
            // If the maximizing player is the winner.
            
            if ( gameController.checkWinner(marker, display=false, array) ){      
                return 1;
            }

            // If the minimizing player is the winner
            else if (gameController.checkWinner("X", display = false, array)){
                return -1;
            }

            // if a tie is found
            else if (array.filter(word => word === "").length === 0){
                return 0;
            }

            // else if (depth === 0){
            //     console.log("here");
            //     return 0;
            // }

            // Loop through the currentArray and determine where the move can be made.

            
            if (ismaximizing){
                
                let maxEval = -Infinity;
                
                for (let i = 0; i < array.length; i++){
                    if (array[i] === ""){
                        array[i] = marker;

                        
                        let eval = miniMax(array, depth - 1, false);

                        maxEval = Math.max(maxEval, eval);

                        array[i] = '';
                        
                    };
                };

                return maxEval;
            
            }else{
                let minEval = Infinity;

                for (let i = 0; i < array.length; i++){
                    if (array[i] === ""){
                        array[i] = marker;

                        let eval = miniMax(array, depth - 1, true);
                        minEval = Math.min(minEval, eval);
                        array[i] = '';
                        
                    };
                    
                };
                return minEval;
            };
            
        };

        return bestIndex();
    };

    return { "easy": firstSpotPlay, "medium": randomPlay, "hard": smartPlay }
})();


// let data = {2:3, 4:5}

// console.log(Math.max(data));
// Player Factory
const createPlayer = (marker) => {
    const getMarker = () => marker;

    return {getMarker}
}


// Gameboard Module

const gameBoard = (() => {
    let gameArray = ['','','','','','','','',''];

    const placemarker = (index, marker) => {
        gameArray[index] = marker};
    
    return { placemarker };

})();

// game controller

const gameController = (() => {
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');

    let pickNumber = 1;
})();
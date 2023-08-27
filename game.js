const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));


    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame () {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 10;
            const posY = elementsSize * (rowI + 1) - 8;

            if (col == 'O'){
                if (!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col + 10, elementsSize * row - 8);
        }
    } */
}

function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enenyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enenyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin () {
    console.log('subiste de nivel');
    level ++;
    startGame();
}

function levelFail () {
    console.log ('Chocaste con un enemigo');
    lives--;

    console.log(lives);
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin () {
    console.log ('Felicidades, Ganaste el juego');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {//Logica cuando ya existe un record previo
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            console.log('SUPERASTE EL RECORD');
        } else {
            console.log('No superaste el record');
        }
    } else {//Logica cuando NO existe un record previo
        localStorage.setItem('record_time', playerTime);
    }
    console.log({recordTime, playerTime});
}

function showLives () {
    /* const heartsArray = Array(lives).fill(emojis['HEART']);
    console.log(heartsArray);

    spanLives.innerHTML = emojis['HEART']; */
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime () {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord () {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

/* function moveByKeys (event) {
    console.log(event);
} */
function moveByKeys (event) {
    if (event.key == 'ArrowUp') {
        moveUp();
    }else if (event.key == 'ArrowLeft'){
        moveLeft();
    }else if (event.key == 'ArrowRight'){
        moveRight();
    }else if (event.key == 'ArrowDown'){
        moveDown();
    }
}
function moveUp () {
    console.log('Me quiero mover hacia arriba');
    if ((playerPosition.y - elementsSize + 8) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft () {
    console.log('Me quiero mover hacia izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight () {
    console.log('Me quiero mover hacia derecha');
    if ((playerPosition.x + elementsSize - 10) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown () {
    console.log('Me quiero mover hacia abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}
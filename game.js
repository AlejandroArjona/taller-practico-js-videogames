const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame () {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 10;
            const posY = elementsSize * (rowI + 1) - 8;
            game.fillText(emoji, posX, posY);
        })
    })

    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col + 10, elementsSize * row - 8);
        }
    } */
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
}
function moveLeft () {
    console.log('Me quiero mover hacia izquierda');
}
function moveRight () {
    console.log('Me quiero mover hacia derecha');
}
function moveDown () {
    console.log('Me quiero mover hacia abajo');
}
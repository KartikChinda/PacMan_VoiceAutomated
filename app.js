const removeScroll = function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
};


// adding event listreners to the two main parts

const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameOverId
let checkWinId
let leftId
let rightId
let upId
let downId
const width = 28;
let pelletsEaten = 0;
// also 28*28 will be 784 squares. 

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

let totalPellets = layout.filter(x => x == 0).length;

// 0 - food
// 1 - border
// 2 - ghosts
// 3 - ghost-killer
// 4 - empty cells

// here we will be drawing and rendering the grid 
const squares = [];

function createGrid() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        // adding classes according to their numbers
        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghosts');
        }
    }


}
createGrid();

// hooking up the start button to ALAN
const startButton = document.getElementById('start');
function startGame() {

    window.addEventListener("keydown", removeScroll
        , false);
    // moving the ghosts and pacman
    ghosts.forEach(ghost => moveGhost(ghost));

    document.addEventListener('keyup', movePac);
    // in order to provide random checks 
    checkWinId = setInterval(didYouWin, 100)
    gameOverId = setInterval(isGameOver, 100)
}
startButton.addEventListener('click', startGame);

// adding pacman to the grid
let pacManIndex = 490;
squares[pacManIndex].classList.add('pac-man');
squares[pacManIndex].classList.add('pac-man-right')

function removePacman() {
    squares[pacManIndex].classList.remove('pac-man')
    squares[pacManIndex].classList.remove('pac-man-right')
    squares[pacManIndex].classList.remove('pac-man-left')
    squares[pacManIndex].classList.remove('pac-man-down')
    squares[pacManIndex].classList.remove('pac-man-up')
}

function goLeft() {
    clearInterval(rightId)
    clearInterval(upId)
    clearInterval(downId)
    rightId = upId = downId = undefined;
    if (leftId) {
        return;
    }
    leftId = setInterval(function () {
        if (
            squares[pacManIndex - 1].classList.contains('wall') ||
            squares[pacManIndex - 1].classList.contains('ghost-lair')
        ) {
            clearInterval(leftId)
        } else {
            removePacman()
            pacManIndex -= 1
            if (squares[pacManIndex - 1] === squares[363]) {
                pacManIndex = 391
            }
            foodEaten()
            pelletEaten()
        }

        squares[pacManIndex].classList.add('pac-man-left')
    }, 250)
}

function goRight() {
    clearInterval(leftId)
    clearInterval(upId)
    clearInterval(downId)
    leftId = upId = downId = undefined;
    if (rightId) {
        return;
    }
    rightId = setInterval(function () {
        if (
            squares[pacManIndex + 1].classList.contains('wall') ||
            squares[pacManIndex + 1].classList.contains('ghost-lair')
        ) {
            clearInterval(rightId)
        } else {
            removePacman()
            pacManIndex += 1
            if (squares[pacManIndex + 1] === squares[392]) {
                pacManIndex = 364
            }
            foodEaten()
            pelletEaten()
        }

        squares[pacManIndex].classList.add('pac-man-right')
    }, 250)
}

function goUp() {
    clearInterval(rightId)
    clearInterval(leftId)
    clearInterval(downId)
    rightId = leftId = downId = undefined;
    if (upId) {
        return;
    }
    upId = setInterval(function () {
        if (
            squares[pacManIndex - width].classList.contains('wall') ||
            squares[pacManIndex - width].classList.contains('ghost-lair')
        ) {
            clearInterval(upId)
        } else {
            removePacman()
            pacManIndex -= width
            squares[pacManIndex].classList.add('pac-man-up')
            foodEaten()
            pelletEaten()
        }
    }, 250)
}

function goDown() {
    clearInterval(rightId)
    clearInterval(upId)
    clearInterval(leftId)
    rightId = upId = leftId = undefined;
    if (downId) {
        return;
    }
    downId = setInterval(function () {
        if (
            squares[pacManIndex + width].classList.contains('wall') ||
            squares[pacManIndex + width].classList.contains('ghost-lair')
        ) {
            clearInterval(downId)
        } else {
            removePacman()
            pacManIndex += width

            squares[pacManIndex].classList.add('pac-man-down')
            foodEaten()
            pelletEaten()
        }
    }, 250)
}

function movePac(e) {
    // creating the logic of moving pacman
    // && conditions check for the presense of walls

    switch (e.keyCode) {
        case 37:
            // left key
            goLeft();
            break;

        case 38:
            // up key
            goUp();
            break;

        case 39:
            // right key
            goRight();
            break;
        case 40:
            // down key
            goDown();
            break;

        default:
            break;
    }

}


// eating the food
function foodEaten() {
    if (squares[pacManIndex].classList.contains('pac-dot')) {
        score++;
        scoreDisplay.innerHTML = score;
        pelletsEaten++;
        squares[pacManIndex].classList.remove('pac-dot');
        squares[pacManIndex].innerHTML = '';
    }
}

// eating the pellets
function pelletEaten() {
    if (squares[pacManIndex].classList.contains('power-pellet')) {
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true);
        // now adding the timeout
        setTimeout(unscareGhosts, 11000);
        squares[pacManIndex].classList.remove('power-pellet');
    }
}

function unscareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

// creating the flipping ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN;
        this.isScared = false;
    }
}

//  creating an array of ghosts. 
const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 350),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// drawing the ghosts on the grid
ghosts.forEach(ghost => {
    // while className ghost is kind of irrelevant, it helps us know that the particular div has a ghost in it. 
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});



function moveGhost(ghost) {
    const directions = [-1, 1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
        if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            !squares[ghost.currentIndex + direction].classList.contains('wall')) {
            //remove the ghosts classes
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            //move into that space
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            //else find a new random direction ot go in
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        // if the ghost is scared, then 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        // code for what happens once the pacman eats the ghost
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }

    }, ghost.speed);
}

function isGameOver() {
    if (squares[pacManIndex].classList.contains('ghost') &&
        !squares[pacManIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePac)
        scoreDisplay.innerHTML = 'YOU LOSE!'
        window.removeEventListener("keydown", removeScroll);
        setTimeout(() => {
            alert("You Lose!");
        }, 500);
        clearInterval(gameOverId)
        clearInterval(checkWinId)
        startButton.innerHTML = 'Reset';
        startButton.removeEventListener('click', startGame);
        startButton.addEventListener('click', () => {
            window.location.reload();
        })
    }
}

function didYouWin() {
    if (pelletsEaten === totalPellets) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePac)

        window.removeEventListener("keydown", removeScroll);
        scoreDisplay.innerHTML = 'YOU WON!'
        setTimeout(() => {
            alert("You Won!");
        }, 500);
        clearInterval(gameOverId)
        clearInterval(checkWinId)
        startButton.innerHTML = 'Reset';
        startButton.removeEventListener('click', startGame);
        startButton.addEventListener('click', () => {
            window.location.reload();
        })
    }
}

function checkPellets() {
    let count = 0;
    if (squares.forEach(findClass)) {
        console.log("Hai");
    }

    function findClass(sq) {
        if (sq.classList.contains('pac-dot')) {
            return true;
        }
    }
}

var alanBtnInstance = alanBtn({
    key: "a39927584c4182045d71c0162692acfb2e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: function (commandData) {
        if (commandData.command === "go:back") {
            //call client code that will react on the received command
        }
        else if (commandData.command === 'goLeft') {
            goLeft();
        }
        else if (commandData.command === 'goRight') {
            goRight();
        }
        else if (commandData.command === 'goUp') {
            goUp();
        }
        else if (commandData.command === 'goDown') {
            goDown();
        }
        else if (commandData.command === 'startGame') {
            startGame();
        }
    },
    //  onCommand: function (commandData) {
    //     if (commandData.command === 'goLeft') {
    //         goLeft();
    //     }
    // }, onCommand: function (commandData) {
    //     if (commandData.command === 'goRight') {
    //         goRight();
    //     }
    // }, onCommand: function (commandData) {
    //     if (commandData.command === 'goUp') {
    //         goUp();
    //     }
    // }, onCommand: function (commandData) {
    //     if (commandData.command === 'goDown') {
    //         goDown();
    //     }
    // }, onCommand: function (commandData) {
    //     if (commandData.command === 'startGame') {
    //         startGame();
    //     }
    // },
    rootEl: document.getElementById("alan-btn")
});




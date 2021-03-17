const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
let scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let intervalTime = 1000
let speed = 0.9
const width = 10
let appleIndex = 0;
let score = 0
let timerId = 0


function createGrid() {
    for (let i = 0; i < 100; i++) {
        const gridSquare = document.createElement('div')
        //add styling to the element
        gridSquare.classList.add('square')
        //put the element into our grid
        grid.appendChild(gridSquare)
        //push it into a new squares array
        squares.push(gridSquare)
    }

}

createGrid()
currentSnake.forEach(i => squares[i].classList.add('snake'))


console.log('initial snake: ', currentSnake)

function startGame() {
    //remove the snake
    currentSnake.forEach(i => squares[i].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    scoreDisplay.textContent = 0
    direction = 1
    intervalTime = 1000
    generateApple()
    //re add the class of snake to our new currentSnake
    currentSnake.forEach(i => squares[i].classList.add('snake'))
    timerId = setInterval(moveSnake, intervalTime)
}

function moveSnake() {
    if (
        (currentSnake[0] + width >= 100 && direction === 10) ||
        (currentSnake[0] % width === 9 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -10) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    console.log('popped the tail: ', tail)
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add sqaure in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate a new apple
        generateApple()
        //add one to the score
        score++
        // display the score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(moveSnake, intervalTime)
    }


    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
    console.log('snake moved: ', currentSnake)
}



function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow


function controlSnake(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 40) {
        direction = +10
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 38) {
        direction = -10
    }
}
document.addEventListener('keyup', controlSnake)
startBtn.addEventListener('click', startGame)
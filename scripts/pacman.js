// Pacman amb p5.js
let grid;
let cols, rows;
let cellSize = 40;
let score = 0;
let lives = 5;
let timer = 0;
let pacman;
let startTime;

function setup() {
    createCanvas(600, 600);
    frameRate(60);
    startTime = millis();
    grid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 2, 1, 1],
        [1, 2, 2, 2, 3, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    cols = grid[0].length;
    rows = grid.length;

    pacman = { x: 4, y: 5 };
}

function draw() {
    background(0);
    timer = int((millis() - startTime) / 1000);
    drawGrid();
    drawInfo();

    if (lives <= 0 || score === 40) {
        gameOver();
    }
}

function drawGrid() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cell = grid[y][x];
            let xpos = x * cellSize;
            let ypos = y * cellSize;

            if (cell === 1) {
                fill(50, 50, 255);
                rect(xpos, ypos, cellSize, cellSize);
            } else if (cell === 2) {
                fill(255, 255, 0);
                ellipse(xpos + cellSize / 2, ypos + cellSize / 2, cellSize / 4);
            }
        }
    }

    fill(255, 255, 0);
    ellipse(pacman.x * cellSize + cellSize / 2, pacman.y * cellSize + cellSize / 2, cellSize / 2);
}

function drawInfo() {
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 20, height - 40);
    text(`Lives: ${lives}`, 150, height - 40);
    text(`Time: ${timer}s`, 280, height - 40);
}

function keyPressed() {
    let nextX = pacman.x;
    let nextY = pacman.y;

    if (keyCode === LEFT_ARROW) nextX--;
    else if (keyCode === RIGHT_ARROW) nextX++;
    else if (keyCode === UP_ARROW) nextY--;
    else if (keyCode === DOWN_ARROW) nextY++;

    if (nextX >= 0 && nextX < cols && nextY >= 0 && nextY < rows) {
        if (grid[nextY][nextX] !== 1) {
            pacman.x = nextX;
            pacman.y = nextY;

            if (grid[nextY][nextX] === 2) {
                score++;
                grid[nextY][nextX] = 0;
            }
        } else {
            lives--;
        }
    }
}

function gameOver() {
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(lives <= 0 ? 'Game Over!' : 'You Win!', width / 2, height / 2);
    noLoop();
}

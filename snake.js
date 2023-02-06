//Create canvas context
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
// Create unit
const box = 32;
// Load images
const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/Juank-snake.jpg';

const canvicha = new Image();

canvicha.id = 'joder';

console.log(canvicha);

// Load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = 'audio/dead.mp3';
eat.src = 'audio/eat.mp3';
up.src = 'audio/up.mp3';
right.src = 'audio/right.mp3';
left.src = 'audio/left.mp3';
down.src = 'audio/down.mp3';

// Create the snake
let snake = [];

snake[0] = {
  x: 1 * box,
  y: 3 * box,
};

// Create the food
let food = {
  // Easy mode not appearing near the walls
  x: Math.floor(Math.random() * 14 + 2) * box,
  y: Math.floor(Math.random() * 13 + 4) * box,

  // Hard mode appearing near the walls

  // x: Math.floor(Math.random() * 17 + 1) * box,
  // y: Math.floor(Math.random() * 15 + 3) * box,
};
// Create the score var
let score = 0;

// Control the snake
let d;

const startButton = document.getElementById('startButtonid');
function startButtonF() {
  d = 'RIGHT';
  right.play();
}
startButton.addEventListener('click', startButtonF);

document.addEventListener('keydown', direction);
function direction(event) {
  if (event.keyCode == 37 && d !== 'RIGHT') {
    d = 'LEFT';
    left.play();
  } else if (event.keyCode == 38 && d !== 'DOWN') {
    d = 'UP';
    up.play();
  } else if (event.keyCode == 39 && d !== 'LEFT') {
    d = 'RIGHT';
    right.play();
  } else if (event.keyCode == 40 && d !== 'UP') {
    d = 'DOWN';
    down.play();
  }
}

// Check collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Draw everything to the canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  ctx.fillStyle = 'white';
  ctx.font = '45px changa one';
  ctx.fillText(score, 2 * box, 1.6 * box);

  //which direction
  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  // If the snake eats the food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 14 + 2) * box,
      y: Math.floor(Math.random() * 13 + 4) * box,
    };
    // We don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }

  // Add new head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  // Game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    dead.play();

    // Game over text
    ctx.fillStyle = 'black';
    ctx.font = '80px bonn';
    ctx.fillText('Game Over', 4 * box, 10 * box);

    clearInterval(game);
  }

  snake.unshift(newHead);
}

// Restart button
const restartButton = document.getElementById('restartButtonid');
restartButton.addEventListener('click', restartButtonF);
function restartButtonF() {
  location.reload();
}

let game = setInterval(draw, 50);

// ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

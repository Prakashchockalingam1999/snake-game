var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
var gameOver = false;
var score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //for 2d animation
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 10000 / 100);
};

function update() {
  if (gameOver) {
    return;
  }

  var cols = board.width / blockSize;
  var rows = board.height / blockSize;

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      console.log(x)

      if ((x + y) % 2 === 0) {
        context.fillStyle = "#87C3FB";
      } else {
        context.fillStyle = "#E0F4FE";
      }
      context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "#FFC840";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  score = snakeBody.length * 5;
  document.getElementById("score").innerHTML = "Score: " + score;

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    context.fillStyle = "red";
    context.font = "40px Arial";
    context.fillText(
      "Game Over",
      (rows * blockSize) / 3.2,
      (cols * blockSize) / 2
    );
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      context.fillStyle = "red";
    context.font = "40px Arial";
    context.fillText(
      "Game Over",
      (rows * blockSize) / 3.2,
      (cols * blockSize) / 2
    );
    }
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

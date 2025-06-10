const Snake = (p) => {
  let bodySize = 25;
  let bodyColor = "blue";
  let headColor = "red";
  let beforeSnake = [
    { x: 75, y: 25, size: bodySize, bodyColor: bodyColor },
    { x: 50, y: 25, size: bodySize, bodyColor: bodyColor },
    { x: 25, y: 25, size: bodySize, bodyColor: bodyColor },
    { x: 0, y: 25, size: bodySize, bodyColor: headColor },
  ];
  let snake = [...beforeSnake];
  let left = 0;
  let right = 1;
  let up = 0;
  let down = 0;
  let food = { x: 100, y: 100 };
  let score = 0;
  let hightScore;

  function checkSnake() {
    if (
      snake[0].x < 0 ||
      snake[0].x >= p.width ||
      snake[0].y < 0 ||
      snake[0].y >= p.height
    ) {
      endGame();
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        endGame();
      }
    }
  }

  function resetSnake() {
    left = 0;
    right = 1;
    up = 0;
    down = 0;
    snake = [...beforeSnake];
  }

  function checkFood(foodX, foodY) {
    for (let i = 0; i < snake.length; i++) {
      if (
        (snake[i].x === foodX && snake[i].y === foodY) ||
        foodX < 0 ||
        foodX >= p.width ||
        foodY < 0 ||
        foodY >= p.height
      ) {
        return true;
      }
    }
    return false;
  }

  function checkEatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      score += 1;
      snake.push(snake[snake.length - 1]);
      let foodX;
      let foodY;
      do {
        foodX = p.round(p.random(p.width / bodySize)) * bodySize;
        foodY = p.round(p.random(p.height / bodySize)) * bodySize;
      } while (checkFood(foodX, foodY));
      food = { x: foodX, y: foodY };
      resetFood();
    }
  }

  function resetFood() {
    p.push();
    p.fill("yellow");
    p.rect(food.x, food.y, bodySize);
    p.pop();
  }

  function keyDown() {
    switch (p.key) {
      case p.LEFT_ARROW:
        if (right === 0) {
          left = -1;
          right = 0;
          up = 0;
          down = 0;
        }
        break;
      case p.RIGHT_ARROW:
        if (left === 0) {
          left = 0;
          right = 1;
          up = 0;
          down = 0;
        }
        break;
      case p.UP_ARROW:
        if (down === 0) {
          left = 0;
          right = 0;
          up = -1;
          down = 0;
        }
        break;
      case p.DOWN_ARROW:
        if (up === 0) {
          left = 0;
          right = 0;
          up = 0;
          down = 1;
        }
        break;
    }
  }

  function showSnake() {
    snake.map((body, index) => {
      const newSnake = () => {
        p.rect(body.x, body.y, body.size);
        p.fill(index + 1 === snake.length ? headColor : bodyColor);
      };
      return newSnake();
    });
    const head = {
      x: snake[0].x + (left + right) * bodySize,
      y: snake[0].y + (up + down) * bodySize,
      size: bodySize,
      bodyColor: bodyColor,
    };
    snake.unshift(head);
    checkSnake();
    snake.pop();
  }

  function endGame() {
    resetSnake();
    p.noLoop();
    p.push();
    p.fill(0);
    hightScore = p.max(hightScore, score);
    p.storeItem("hightScoreSnake", hightScore);
    p.text("SNAKE EAT FOOD", p.width / 2, 100);
    p.text(`Điểm: ${score}`, p.width / 2, p.height / 2 - 50);
    p.text(`Điểm cao nhất: ${hightScore}`, p.width / 2, p.height / 2);
    p.text("Nhấn để bắt đầu", p.width / 2, p.height / 2 + 50);
    p.pop();
  }

  function startGame() {
    p.loop();
    p.push();
    p.fill("red");
    p.text(`${score}`, p.width / 2, 100);
    p.pop();
  }

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      if (p.isLooping() === false) {
        startGame();
        score = 0;
      }
    }
  };

  p.setup = () => {
    p.createCanvas(800, 500);
    p.frameRate(10);
    hightScore = p.getItem("hightScoreSnake");
    if (hightScore === null) {
      hightScore = 0;
    }
    p.noLoop();
  };

  p.draw = () => {
    p.background(220);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(40);
    keyDown();
    showSnake();
    resetFood();
    checkEatFood();
    if (p.isLooping() === false) {
      endGame();
    } else {
      startGame();
    }
  };
};

export default Snake;

import Matter from "matter-js";

const PingPong = (p) => {
  let Engine = Matter.Engine;
  let Runner = Matter.Runner;
  let Composite = Matter.Composite;
  let Bodies = Matter.Bodies;
  let Body = Matter.Body;
  let Events = Matter.Events;

  let engine;
  let world;

  let paddleLeft;
  let paddleLeftY;
  let paddleRight;
  let paddleRightY;
  let paddleWidth = 10;
  let paddleHeight = 100;
  let ball;
  let groundTop;
  let groundBottom;
  let groundHeight = 10;
  let ballSize = 20;
  let initialSpeed = 5;
  let AfterCollisionSpeed = 10;
  let ballVelocity;

  let scoreLeft = 0;
  let scoreRight = 0;
  let VictoryPoint = 10;

  function keyDown() {
    if (p.keyIsPressed === true) {
      if (p.keyIsDown("w") === true) {
        paddleLeftY -= paddleLeftY <= 50 ? 0 : 10;
        Body.setPosition(paddleLeft, {
          x: paddleLeft.position.x,
          y: paddleLeftY,
        });
      }
      if (p.keyIsDown("s") === true) {
        paddleLeftY += paddleLeftY >= p.height - 50 ? 0 : 10;
        Body.setPosition(paddleLeft, {
          x: paddleLeft.position.x,
          y: paddleLeftY,
        });
      }
      if (p.keyIsDown(p.UP_ARROW) === true) {
        paddleRightY -= paddleRightY <= 50 ? 0 : 10;
        Body.setPosition(paddleRight, {
          x: paddleRight.position.x,
          y: paddleRightY,
        });
      }
      if (p.keyIsDown(p.DOWN_ARROW) === true) {
        paddleRightY += paddleRightY >= p.height - 50 ? 0 : 10;
        Body.setPosition(paddleRight, {
          x: paddleRight.position.x,
          y: paddleRightY,
        });
      }
    }
  }

  function collision() {
    Events.on(engine, "collisionStart", (e) => {
      const pairs = e.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if (
          pair.bodyA === groundTop ||
          pair.bodyB === groundTop ||
          pair.bodyA === groundBottom ||
          pair.bodyB === groundBottom ||
          pair.bodyA === paddleLeft ||
          pair.bodyB === paddleLeft ||
          pair.bodyA === paddleRight ||
          pair.bodyB === paddleRight
        ) {
          Body.setSpeed(ball, 10);
        }
      }
    });
    Events.on(engine, "collisionEnd", (e) => {
      const pairs = e.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if (
          pair.bodyA === groundTop ||
          pair.bodyB === groundTop ||
          pair.bodyA === groundBottom ||
          pair.bodyB === groundBottom ||
          pair.bodyA === paddleLeft ||
          pair.bodyB === paddleLeft ||
          pair.bodyA === paddleRight ||
          pair.bodyB === paddleRight
        ) {
          Body.setSpeed(ball, 10);
        }
      }
    });
  }

  function resetBall() {
    Body.setPosition(ball, { x: p.width / 2, y: p.height / 2 });

    const angle = p.random(p.TWO_PI);
    ballVelocity = Matter.Vector.create(
      AfterCollisionSpeed * p.cos(angle),
      AfterCollisionSpeed * p.sin(angle)
    );
    Body.setVelocity(ball, ballVelocity);
    Body.setSpeed(ball, initialSpeed);
  }

  function totalScore() {
    if (ball.position.x < -50) {
      scoreRight += 1;
      resetBall();
    }
    if (ball.position.x > p.width + 50) {
      scoreLeft += 1;
      resetBall();
    }
  }

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      if (p.isLooping() === false) {
        p.loop();
        if (scoreLeft === VictoryPoint || scoreRight === VictoryPoint) {
          scoreLeft = 0;
          scoreRight = 0;
        }
      } else if (
        p.mouseX >= 15 &&
        p.mouseX <= 120 &&
        p.mouseY >= 15 &&
        p.mouseY <= 45
      ) {
        resetBall();
      } else if (
        p.mouseX >= p.width - 70 &&
        p.mouseX <= p.width - 10 &&
        p.mouseY >= 15 &&
        p.mouseY <= 45
      ) {
        p.noLoop();
      }
    }
  };

  function startGame() {
    p.textSize(20);
    p.text("Bắt đầu lại", 60, 30);
    p.text("Dừng", p.width - 40, 30);
    totalScore();
  }

  function endGame() {
    p.noLoop();
    p.textSize(40);
    p.text("Ping Pong", p.width / 2, 50);
    p.text("Nhấn để bắt đầu", p.width / 2, p.height / 2 + 100);
    p.text(
      `Điểm chiến thắng: ${VictoryPoint}`,
      p.width / 2,
      p.height / 2 + 150
    );
  }

  p.setup = () => {
    p.createCanvas(800, 500);
    engine = Engine.create({ gravity: { x: 0, y: 0 } });
    world = engine.world;
    Runner.run(engine);

    paddleLeftY = p.height / 2;
    paddleRightY = p.height / 2;

    paddleLeft = Bodies.rectangle(5, paddleLeftY, paddleWidth, paddleHeight, {
      isStatic: true,
    });
    paddleRight = Bodies.rectangle(
      p.width - 5,
      paddleRightY,
      paddleWidth,
      paddleHeight,
      {
        isStatic: true,
      }
    );
    ball = Bodies.circle(p.width / 2, p.height / 2, ballSize, {
      frictionAir: 0,
      restitution: 1,
    });
    groundTop = Bodies.rectangle(p.width / 2, 5, p.width, groundHeight, {
      isStatic: true,
    });
    groundBottom = Bodies.rectangle(
      p.width / 2,
      p.height - 5,
      p.width,
      groundHeight,
      {
        isStatic: true,
      }
    );

    Composite.add(world, [
      paddleLeft,
      paddleRight,
      ball,
      groundTop,
      groundBottom,
    ]);

    p.noLoop();
    resetBall();
    collision();
  };

  p.draw = () => {
    p.background(220);
    Engine.update(engine);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(40);
    p.rectMode(p.CENTER);
    p.rect(5, paddleLeftY, paddleWidth, paddleHeight);
    p.rect(p.width - 5, paddleRightY, paddleWidth, paddleHeight);
    p.ellipseMode(p.RADIUS);
    p.ellipse(ball.position.x, ball.position.y, ballSize);
    p.rect(groundTop.position.x, groundTop.position.y, p.width, groundHeight);
    p.rect(
      groundBottom.position.x,
      groundBottom.position.y,
      p.width,
      groundHeight
    );
    keyDown();
    p.text(`${scoreLeft}`, p.width / 4, 100);
    p.text(`${scoreRight}`, p.width / 2 + p.width / 4, 100);
    if (
      p.isLooping() === false ||
      scoreLeft === VictoryPoint ||
      scoreRight === VictoryPoint
    ) {
      endGame();
    } else {
      startGame();
    }
  };
};

export default PingPong;

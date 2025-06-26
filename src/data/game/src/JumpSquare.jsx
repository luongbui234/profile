const JumpSquare = (p) => {
  let person;
  let personColor = "red";
  let personSpeed = 5;
  let canJump = false;
  let canMoveLeft = true;
  let canMoveRight = true;
  let screen = 0;
  let winScreen = {};
  let checkScreen;
  let screenW = 2500;
  let screenH = 600;
  let platforms = [];
  let platformW = 100;
  let platformH = 25;
  let platformColor = "orange";
  let platformMovingX = 5;
  let platformScreen1 = [0, 1, 2, 3, 4, 5];
  let platformScreen2 = [6, 7, 8, 9, 10, 11, 12];
  let platformsMovingR = [6, 7, 9, 11];
  let platformsMovingL = [12];
  let grounds = [];
  let groundW = 200;
  let groundH = 50;
  let groundWinW = 1000;
  let groundColor = "brown";
  let groundScreen1 = [0, 1, 2];
  let groundScreen2 = [3, 4, 5];
  let cameraX;
  let cameraY;
  let exit;

  class Ground {
    constructor(x, y, w, h) {
      // this.initialX = x;
      // this.initialY = y;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      // this.active = false;
    }

    show() {
      // if (!this.active) return;
      p.push();
      p.fill(groundColor);
      p.rect(this.x, this.y, this.w, this.h);
      p.pop();
    }

    hide() {
      this.x = 0;
    }
  }

  class PlatFormMotion {
    constructor() {
      this.moving = false;
      this.movingDirection = "right";
      this.movingRight = true;
      this.movingLeft = true;
      this.dx = 0;
      this.dy = 0;
    }

    updateDx(pixels) {
      if (this.moving) {
        if (this.movingDirection === "right") {
          if (this.movingRight) {
            this.dx += pixels;
          } else {
            this.dx -= pixels;
          }
          if (this.dx >= platformMovingX) {
            this.movingRight = false;
          }
          if (this.dx <= -platformMovingX) {
            this.movingRight = true;
          }
        } else if (this.movingDirection === "left") {
          if (this.movingLeft) {
            this.dx -= pixels;
          } else {
            this.dx += pixels;
          }
          if (this.dx <= -platformMovingX) {
            this.movingLeft = false;
          }
          if (this.dx >= platformMovingX) {
            this.movingLeft = true;
          }
        }
      }
    }
  }

  class Platform {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.motion = new PlatFormMotion();
    }

    setMoving(bool, direction) {
      this.motion.moving = bool;
      this.motion.movingDirection = direction;
    }

    show() {
      p.push();
      this.motion.updateDx(0.1);
      this.x += this.motion.dx;
      this.y += this.motion.dy;
      const leftPlatform = platforms.find((platform) => {
        return person.leftPlatform(platform);
      });

      const rightPlatform = platforms.find((platform) => {
        return person.rightPLatform(platform);
      });
      if (person.atPlatform(this)) {
        person.x += this.motion.dx;
      }
      if (leftPlatform) {
        person.x += 3;
      }
      if (rightPlatform) {
        person.x -= 3;
      }
      p.fill(platformColor);
      p.rect(this.x, this.y, this.w, this.h);
      p.pop();
    }

    hide() {
      this.x = 0;
    }
  }

  class Person {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.jumpHeight = 14;
      this.forceY = 0;
      this.gravity = 1;
    }

    show() {
      p.push();
      p.fill(personColor);
      p.rect(this.x, this.y, this.w, this.h);
      p.pop();
    }

    checkGravity() {
      let currentGrounds = [];
      let currentPlatforms = [];

      if (screen === 1) {
        currentGrounds = groundScreen1.map((index) => grounds[index]);
        currentPlatforms = platformScreen1.map((index) => platforms[index]);
      } else if (screen === 2) {
        currentGrounds = groundScreen2.map((index) => grounds[index]);
        currentPlatforms = platformScreen2.map((index) => platforms[index]);
      }

      const onGround = currentGrounds.find((ground) => {
        return this.atGround(ground);
      });

      const onPlatform = currentPlatforms.find((platform) => {
        return this.atPlatform(platform);
      });

      const underPlatform = currentPlatforms.find((platform) => {
        return this.underPlatform(platform);
      });

      const leftPlatform = currentPlatforms.find((platform) => {
        return this.leftPlatform(platform);
      });

      const rightPlatform = currentPlatforms.find((platform) => {
        return this.rightPLatform(platform);
      });

      if (underPlatform) {
        this.forceY = 0;
        this.forceY += this.gravity;
      } else if (onGround || onPlatform) {
        this.forceY = 0;
        this.y = (onGround ? onGround.y : onPlatform.y) - this.h;
        canJump = true;
      } else if (leftPlatform || rightPlatform) {
        if (leftPlatform) {
          this.x = leftPlatform.x + leftPlatform.w;
          canMoveLeft = false;
        }
        if (rightPlatform) {
          this.x = rightPlatform.x - this.w;
          canMoveRight = false;
        }
      } else {
        this.forceY += this.gravity;
      }
      canMoveLeft = true;
      canMoveRight = true;
      this.y += this.forceY;
    }

    atGround(ground) {
      const personX = this.x + this.w;
      const personY = this.y + this.h;
      const checkY = personY >= ground.y && personY <= ground.y + this.forceY;
      const checkX = personX >= ground.x && this.x <= ground.x + ground.w;
      return checkX && checkY;
    }

    atPlatform(platform) {
      const personX = this.x + this.w;
      const personY = this.y + this.h;
      const checkY =
        personY >= platform.y && personY <= platform.y + this.forceY;
      const checkX = personX >= platform.x && this.x <= platform.x + platform.w;
      return checkY && checkX;
    }

    underPlatform(platform) {
      const personX = this.x + this.w;
      const checkX = personX >= platform.x && this.x <= platform.x + platform.w;
      const checkY =
        this.y <= platform.y + platform.h && this.y >= platform.y + this.forceY;
      return checkX && checkY;
    }

    leftPlatform(platform) {
      // const personX = this.x + this.w;
      const personY = this.y + this.h;

      // person xoay trái
      const checkX = personY > platform.y && this.y < platform.y + platform.h;
      const checkY =
        this.x <= platform.x + platform.w && this.x - personSpeed >= platform.x;
      return checkX && checkY;
    }

    rightPLatform(platform) {
      const personX = this.x + this.w;
      const personY = this.y + this.h;

      // person xoay phải
      const checkX = personY > platform.y && this.y < platform.y + platform.h;
      const checkY =
        personX >= platform.x &&
        personX + personSpeed <= platform.x + platform.w;
      return checkX && checkY;
    }

    jump() {
      if (canJump) {
        this.forceY -= this.jumpHeight;
        canJump = false;
      }
    }

    checkDirection() {
      if (p.keyIsDown("a")) {
        if (canMoveLeft) {
          this.x -= personSpeed;
        }
      } else if (p.keyIsDown("d")) {
        if (canMoveRight) {
          this.x += personSpeed;
        }
      }
    }
  }

  class Exit {
    constructor(w, h) {
      this.w = w;
      this.h = h;
    }

    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }

    show() {
      p.push();
      p.rect(this.x, this.y, this.w, this.h);
      p.fill("red");
      p.triangle(
        this.x,
        this.y,
        this.x,
        this.y + 40,
        this.x + 40,
        this.y + 40 / 2
      );
      p.pop();
    }
  }

  function winGame() {
    winScreen[`man${screen}`] = true;
    checkScreen = winScreen;
    p.storeItem("screens", winScreen);
    p.resetMatrix();
    p.textSize(40);
    p.fill("red");
    p.text("Bạn Đã Thắng", p.width / 2, 100);
    p.fill("black");
    p.text("Nhấn để chơi lại!", p.width / 2, p.height / 2);
    p.noLoop();
  }

  function finish() {
    const onGround = grounds.find((ground) => {
      return person.atGround(ground);
    });
    person.x += person.x > exit.x ? 3 : 0;
    return person.x > exit.x + p.height / 2 && onGround;
  }

  function camera() {
    cameraX = person.x - p.width / 2;
    cameraY = person.y - p.height / 2;
    cameraX = p.constrain(cameraX, 0, screenW - p.width);
    cameraY = p.constrain(cameraY, -screenH + p.height, 0);
    p.translate(-cameraX, -cameraY);
  }

  function screen2() {
    screenW = 3500;
    if (person.y > 600) {
      p.resetMatrix();
      endGame();
      p.noLoop();
    } else if (finish()) {
      winGame();
    } else {
      p.loop();
      exit.setPosition(3250, 350);
      exit.show();
      person.show();
      for (let i of platformScreen2) {
        platforms[i].show();
      }
      for (let i of platformsMovingR) {
        platforms[i].setMoving(true, "right");
      }
      for (let i of platformsMovingL) {
        platforms[i].setMoving(true, "left");
      }
      for (let i of groundScreen2) {
        grounds[i].show();
      }
    }
  }

  function screen1() {
    if (person.y > 600) {
      p.resetMatrix();
      endGame();
      p.noLoop();
    } else if (finish()) {
      winGame();
    } else {
      p.loop();
      exit.setPosition(2000, 350);
      exit.show();
      person.show();
      for (let i of platformScreen1) {
        platforms[i].show();
      }
      for (let i of platformsMovingR) {
        platforms[i].setMoving(true, "right");
      }
      for (let i of groundScreen1) {
        grounds[i].show();
      }
    }
  }

  function screenBtn() {
    p.push();
    p.resetMatrix();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(20);
    p.fill("#5738AF");
    p.rect(10, 10, 75, 40, 10);
    p.rect(95, 10, 75, 40, 10);
    p.fill("#CFD4FC");
    p.text("1", 47.5, 30);
    p.text("2", 132.5, 30);
    p.stroke("limegreen");
    p.strokeWeight(3);
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);
    if (checkScreen?.man1) {
      p.line(65, 10, 75, 20);
      p.line(75, 20, 85, 5);
    }
    if (checkScreen?.man2) {
      p.line(150, 10, 160, 20);
      p.line(160, 20, 170, 5);
    }
    p.pop();
    switch (screen) {
      case 1:
        screen1();
        break;
      case 2:
        screen2();
        break;
    }
  }

  function resetPerson() {
    person.x = 125;
    person.y = 200;
  }

  function startGame() {
    p.loop();
    camera();
  }

  function endGame() {
    p.push();
    p.textSize(40);
    p.fill("red");
    p.text("Trò chơi kết thúc", p.width / 2, 100);
    p.fill("black");
    p.text("Nhấn để chơi lại!", p.width / 2, p.height / 2);
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(800, 500);
    winScreen = JSON.parse(localStorage.getItem("screens"));
    if (winScreen === null) {
      winScreen = { man1: false, man2: false, man3: false };
    } else {
      checkScreen = winScreen;
    }
    p.textAlign(p.CENTER);
    p.textSize(40);
    person = new Person(125, 200, 25, 25);

    // screen1
    grounds.push(new Ground(50, 450, groundW, groundH));
    grounds.push(new Ground(500, 450, groundW, groundH));
    grounds.push(new Ground(1700, 450, groundWinW, groundH));
    platforms.push(new Platform(320, 410, platformW, platformH));
    platforms.push(new Platform(800, 400, platformW, platformH));
    platforms.push(new Platform(950, 320, platformW, platformH));
    platforms.push(new Platform(1100, 240, platformW, platformH));
    platforms.push(new Platform(1250, 160, platformW, platformH));
    platforms.push(new Platform(1400, 80, platformW, platformH));

    // screen2
    grounds.push(new Ground(50, 450, groundW, groundH));
    grounds.push(new Ground(750, 450, groundW, groundH));
    grounds.push(new Ground(3150, 450, groundWinW, groundH));
    platforms.push(new Platform(320, 400, platformW, platformH));
    platforms.push(new Platform(1020, 400, platformW, platformH));
    platforms.push(new Platform(1400, 320, platformW, platformH));
    platforms.push(new Platform(1570, 260, platformW, platformH));
    platforms.push(new Platform(1950, 180, platformW, platformH));
    platforms.push(new Platform(2150, 260, platformW, platformH));
    platforms.push(new Platform(2900, 340, platformW, platformH));

    exit = new Exit(0, 100);
    p.noLoop();
  };

  p.draw = () => {
    p.background(220);
    if (p.isLooping()) {
      startGame();
    } else {
      screen !== 0
        ? endGame()
        : p.text("Chọn màn chơi!", p.width / 2, p.height / 2);
    }
    person.checkGravity();
    person.checkDirection();
    p.keyPressed = () => {
      p.key === " " && person.jump();
    };
    screenBtn();
    p.mousePressed = () => {
      if (
        p.mouseX >= 0 &&
        p.mouseX <= p.width &&
        p.mouseY >= 0 &&
        p.mouseY <= p.height
      ) {
        if (
          p.mouseX >= 10 &&
          p.mouseX <= 85 &&
          p.mouseY >= 10 &&
          p.mouseY <= 50
        ) {
          screen = 1;
        }
        if (
          p.mouseX >= 95 &&
          p.mouseX <= 170 &&
          p.mouseY >= 10 &&
          p.mouseY <= 50
        ) {
          screen = 2;
        }
        if (!p.isLooping() && screen !== 0) {
          resetPerson();
          startGame();
        }
      }
    };
  };
};

export default JumpSquare;

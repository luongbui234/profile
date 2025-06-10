const ClickCircle = (p) => {
  let circleX;
  let circleY;
  let circleRadius;
  let circleMaximumRadius;
  let circleColor;
  let score = 0;
  let hightScore;

  p.setup = () => {
    p.createCanvas(800, 500);
    p.colorMode(p.HSB);
    hightScore = p.getItem("hightScoreClickCircle");
    if (hightScore === null) {
      hightScore = 0;
    }
    p.noLoop();
  };

  p.draw = () => {
    p.background(220);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(40);
    if (circleRadius > 0) {
      p.fill("red");
      p.text(`Điểm: ${score}`, p.width / 2, 50);
      p.fill(circleColor);
      p.circle(circleX, circleY, circleRadius);
      circleRadius -= 1;
    } else {
      endGame();
    }
  };
  function startGame() {
    score = 0;
    circleMaximumRadius = p.min(p.width / 2, p.height / 2);
    resetCircle();
  }
  function endGame() {
    p.noLoop();
    p.fill(0);
    hightScore = p.max(hightScore, score);
    p.storeItem("hightScoreClickCircle", hightScore);
    p.text(`Điểm: ${score}`, p.width / 2, p.height / 2 - 50);
    p.text(`Điểm cao nhất: ${hightScore}`, p.width / 2, p.height / 2);
    p.text("Nhấn để bắt đầu", p.width / 2, p.height / 2 + 50);
  }

  function resetCircle() {
    circleRadius = circleMaximumRadius;
    circleX = p.random(circleRadius, p.width - circleRadius);
    circleY = p.random(circleRadius, p.height - circleRadius);
    circleColor = p.color(
      p.random(240, 360),
      p.random(40, 80),
      p.random(50, 90)
    );
  }

  p.mousePressed = () => {
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      if (p.isLooping() === true) {
        let distanceToCircle = p.dist(p.mouseX, p.mouseY, circleX, circleY);

        if (distanceToCircle < circleRadius) {
          circleMaximumRadius = p.max(circleMaximumRadius - 1, 15);
          resetCircle();
          score += 1;
        }
      } else {
        p.loop();
        startGame();
      }
    }
  };
};

export default ClickCircle;

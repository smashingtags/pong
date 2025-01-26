const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function setCanvasSize() {
      canvas.width = 800;
      canvas.height = 600;
    }
    setCanvasSize();

    // Create ball and paddles
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 15,
      speedX: 3,
      speedY: 3,
      color: '#FF0000'
    };

    const paddleHeight = 10;
    const paddleWidth = 8;

    // Top paddle
    const topPaddle = {
      x: canvas.width / 2 - (paddleWidth / 2),
      y: 0 + paddleHeight,
      speed: 3
    };

    // Bottom paddle
    const bottomPaddle = {
      x: canvas.width / 2 - (paddleWidth / 2),
      y: canvas.height - paddleHeight - 15,
      speed: 3
    };

    function draw() {
      // Draw ball
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw top paddle
      ctx.fillStyle = '# white';
      ctx.fillRect(topPaddle.x - paddleWidth / 2, topPaddle.y, paddleWidth, paddleHeight);

      // Draw bottom paddle
      ctx.fillStyle = '# white';
      ctx.fillRect(bottomPaddle.x - paddleWidth / 2, bottomPaddle.y, paddleWidth, paddleHeight);
    }

    function update() {
      // Move ball
      ball.x += ball.speedX;
      ball.y += ball.speedY;

      // Bounce off walls
      if (ball.x < 0 || ball.x > canvas.width - ball.size) {
        ball.speedX = -ball.speedX;
      }
      if (ball.y < 0 + ball.size || ball.y > canvas.height - ball.size) {
        ball.speedY = -ball.speedY;
      }

      // Paddle movement
      const topPaddleLeft = canvas.width / 2 - paddleWidth / 2;
      const topPaddleRight = canvas.width / 2 + paddleWidth / 2;

      if (event.keyCode === 37 && ball.y > topPaddle.y) {
        if (ball.x < topPaddle.x) {
          ball.x -= (topPaddle.x - ball.x);
        }
      }

      if (event.keyCode === 39 && ball.y < canvas.height - bottomPaddle.y - ball.size) {
        if (ball.x > bottomPaddle.x) {
          ball.x += (bottomPaddle.x - ball.x);
        }
      }
    }

    function collision() {
      // Top paddle
      if (ball.y + ball.size < topPaddle.y && Math.abs(ball.x - topPaddle.x) < Math.abs(topPaddle.x - topPaddle.x)) {
        ball.speedY = -ball.speedY;
      }

      // Bottom paddle
      if (ball.y > canvas.height - bottomPaddle.y - ball.size && 
          Math.abs(ball.x - bottomPaddle.x) < Math.abs(bottomPaddle.x - bottomPaddle.x)) {
        ball.speedY = -ball.speedY;
      }
    }

    function gameLoop() {
      draw();
      update();
      collision();
      requestAnimationFrame(gameLoop);
    }

    // Handle input
    let isPlaying = false;

    function handleKeyDown(e) {
      if (isPlaying) {
        switch(e.keyCode) {
          case 37: // Left arrow
            topPaddle.x -= 2;
            break;
          case 39: // Right arrow
            topPaddle.x += 2;
            break;
        }
      }
    }

    function handleKeyUp(e) {
      switch(e.keyCode) {
        case 37: // Left arrow
          if (e.code === 'keyup' && e.key === 'Left') {
            topPaddle.x += 2;
          }
          break;
        case 39: // Right arrow
          if (e.code === 'keyup' && e.key === 'Right') {
            topPaddle.x -= 2;
          }
          break;
      }
    }

    // Start game
    const start = document.getElementById('gameCanvas');
    start.addEventListener('keydown', handleKeyDown);
    start.addEventListener('keyup', handleKeyUp);

    gameLoop();

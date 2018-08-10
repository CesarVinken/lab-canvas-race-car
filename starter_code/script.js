var obstacles = [];

var game = {
  canvas: document.getElementById("canvas"),
  start: function() {
    this.canvas.width = $("#canvas").attr("width");
    this.canvas.height = $("#canvas").attr("height");
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGame, 20);
  },
  frames: 0,
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

var player = new Component(
  60,
  100,
  game.canvas.width / 2 - 30,
  game.canvas.height - 120
);
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    createGame();
    $(".game-intro").hide();
    drawRoad();

    player.createPlayer();
  }
};

function drawRoad() {
  game.ctx.save();

  //asfalt
  game.ctx.beginPath();
  game.ctx.rect(0, 0, game.canvas.width, game.canvas.height);
  game.ctx.fillStyle = "grey";
  game.ctx.fill();

  //grass
  game.ctx.lineWidth = game.canvas.width * 0.18;
  game.ctx.strokeStyle = "green";

  game.ctx.beginPath();
  game.ctx.moveTo(0, 0);
  game.ctx.lineTo(0, game.canvas.height);
  game.ctx.closePath();
  game.ctx.stroke();

  game.ctx.beginPath();
  game.ctx.moveTo(game.canvas.width, 0);
  game.ctx.lineTo(game.canvas.width, game.canvas.height);
  game.ctx.closePath();
  game.ctx.stroke();

  //white line
  game.ctx.lineWidth = game.canvas.width * 0.03;
  game.ctx.strokeStyle = "white";

  game.ctx.beginPath();
  game.ctx.moveTo(game.canvas.width * 0.13, 0);
  game.ctx.lineTo(game.canvas.width * 0.13, game.canvas.height);
  game.ctx.closePath();
  game.ctx.stroke();

  game.ctx.beginPath();
  game.ctx.moveTo(game.canvas.width - game.canvas.width * 0.13, 0);
  game.ctx.lineTo(
    game.canvas.width - game.canvas.width * 0.13,
    game.canvas.height
  );
  game.ctx.closePath();
  game.ctx.stroke();

  game.ctx.lineWidth = game.canvas.width * 0.02;
  let stripeLength = 20;
  let stripePadding = 22;
  for (let i = 0; i < 12; i++) {
    game.ctx.beginPath();
    game.ctx.moveTo(
      game.canvas.width / 2,
      stripeLength * i + stripePadding * i
    );
    game.ctx.lineTo(
      game.canvas.width / 2,
      stripeLength * i + stripePadding * i + stripeLength
    );
    game.ctx.closePath();
    game.ctx.stroke();
  }
  game.ctx.beginPath();
  game.ctx.moveTo(game.canvas.width - game.canvas.width * 0.13, 0);
  game.ctx.lineTo(
    game.canvas.width - game.canvas.width * 0.13,
    game.canvas.height
  );
  game.ctx.closePath();
  game.ctx.stroke();

  game.ctx.restore();
}

function moveLeft() {
  if (player.x > 0) {
    if (player.speedX < -6) {
      player.speedX = -6;
    } else {
      player.speedX -= 2;
    }
  } else player.speedX = 0;
}

function moveRight() {
  if (player.x < game.canvas.width - player.width) {
    if (player.speedX > 6) {
      player.speedX = 6;
    } else {
      player.speedX += 2;
    }
  } else player.speedX = 0;
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      moveLeft();
      break;
    case 39:
      moveRight();
      break;
  }
};

function createGame() {
  game.start();
}

function updateGame() {
  for (i = 0; i < obstacles.length; i += 1) {
    if (player.crashWith(obstacles[i])) {
      game.stop();
      return;
    }
  }

  game.clear();
  game.frames += 1;

  drawRoad();

  if (game.frames % 100 === 0) {
    minWidth = 20;
    maxWidth = 210;
    width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);

    minGap = 40;
    maxGap = 90;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    obstacles.push(new Component(width, 10, 0, 0));
    obstacles.push(
      new Component(0 - width - gap, 10, game.canvas.width - width + gap, 0)
    );
    console.log(obstacles.length);
  }
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y += 2;
    obstacles[i].update();
  }

  player.newPos();
  player.update();
}

document.onkeyup = function(e) {
  stopMove();
};

function stopMove() {
  if (player) player.speedX = 0;
}

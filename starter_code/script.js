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

var player;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    createGame();
    $(".game-intro").hide();
    drawRoad();
    drawPlayer();
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

function drawPlayer() {
  player = new Player(
    60,
    100,
    game.canvas.width / 2 - 30,
    game.canvas.height - 120
  );
  player.img.onload = function() {
    game.ctx.drawImage(
      player.img,
      player.x,
      player.y,
      player.width,
      player.height
    );
  };
}

function moveLeft() {
  if (player.x > 0) player.speedX -= 4;
  else player.speedX = 0;
}

function moveRight() {
  if (player.x < game.canvas.width) player.speedX += 1;
  else player.speedX = 0;
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

function Player(width, height, x, y) {
  this.img = new Image();
  this.img.src = "./images/car.png";

  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;

  this.update = function() {
    // game.ctx = game.context;
    // game.ctx.fillStyle = color;
    // game.ctx.fillRect(this.x, this.y, this.width, this.height);
    game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    if (this.x < 0) this.x = 0;
    if (this.x > game.canvas.width - this.width)
      this.x = game.canvas.width - this.width;

    this.y += this.speedY;
  };
}

function createGame() {
  game.start();
}

function updateGame() {
  game.clear();
  game.frames += 1;

  drawRoad();
  player.newPos();
  player.update();
}

// CSS  JS Result
// EDIT ON
//  var myObstacles = [];

// function startGame() {
//     myGameArea.start();
//     player = new component(30, 30, "red", 0, 110);
// }

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//       this.interval = setInterval(updateGameArea, 20);
//     },
//     frames: 0,
//     clear : function() {
//           this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       },
//   score: function() {
//     points = (Math.floor(this.frames/5))
//     this.context.font = '18px serif';
//     this.context.fillStyle = 'black';
//     this.context.fillText('Score: '+points, 350, 50);
//   },
//   stop : function() {
//         clearInterval(this.interval);
//     }
// }

// function component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.update = function(){
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//     }
//     this.left   = function() { return this.x                 }
//     this.right  = function() { return (this.x + this.width)  }
//     this.top    = function() { return this.y                 }
//     this.bottom = function() { return this.y + (this.height) }

//                                                                 this.crashWith = function(obstacle) {
//       return !((this.bottom() < obstacle.top())    ||
//                (this.top()    > obstacle.bottom()) ||
//                (this.right()  < obstacle.left())   ||
//                (this.left()   > obstacle.right()))
//     }
// }

// function updateGameArea() {
//     for (i = 0; i < myObstacles.length; i += 1) {
//         if (player.crashWith(myObstacles[i])) {
//             myGameArea.stop();
//             return;
//         }
//     }
//     myGameArea.clear();
//     myGameArea.frames +=1;
//     if (myGameArea.frames % 100 === 0) {
//         x = myGameArea.canvas.width;
//         minHeight = 20;
//         maxHeight = 200;
//         height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//         minGap = 50;
//         maxGap = 200;
//         gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//         myObstacles.push(new component(10, height, "green", x, 0));
//         myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
//     }
//     for (i = 0; i < myObstacles.length; i += 1) {
//         myObstacles[i].x += -1;
//         myObstacles[i].update();
//     }
//     player.newPos();
//     player.update();
//     myGameArea.score();
// }

// function moveUp() {
//     player.speedY -= 1;
// }

// function moveDown() {
//     player.speedY += 1;
// }

// function moveLeft() {
//     player.speedX -= 1;
// }

// function moveRight() {
//     player.speedX += 1;
// }

// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 38:
//       moveUp();
//       break;
//     case 40:
//       moveDown();
//       break;
//     case 37:
//       moveLeft();
//       break;
//     case 39:
//       moveRight();
//       break;
//   }
// }

// document.onkeyup = function(e) {
//   stopMove();
// }

// function stopMove() {
//     player.speedX = 0;
//     player.speedY = 0;
// }

// startGame();
// VIEW RESOURCES  1×
// 0.5×
// 0.25×
//  RERUN

function Component(width, height, x, y) {
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
  };

  this.left = function() {
    return this.x;
  };
  this.right = function() {
    return this.x + this.width;
  };
  this.top = function() {
    return this.y;
  };
  this.bottom = function() {
    return this.y + this.height;
  };

  this.crashWith = function(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  };
}

Component.prototype.createPlayer = function() {
  var player = new Component(
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
};

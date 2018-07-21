function createGameCam(x, y, w, h) {
    return new GameCam(x, y, w, h);
}

function GameCam(x_, y_, w_, h_) {
    if (x_ === undefined) {
        x_ = 0;
    }
    if (y_ === undefined) {
        y_ = 0;
    }
    if (w_ === undefined) {
        w_ = width;
    }
    if (h_ === undefined) {
        h_ = height;
    }
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;

    this.zoom = 1;

    this.screen = createGraphics(this.w, this.h);
}

// Converts the current GameCam screen into a p5 image object
GameCam.prototype.snapshot = function() {
    return this.screen.get();
}

// Draws the GameCam screen to the canvas
GameCam.prototype.draw = function(x, y) {
    image(this.snapshot(), x, y, this.w, this.h);
    noFill();
    strokeWeight(4);
    stroke(255, 0, 0);
    rect(x, y, this.w, this.h);
    fill(255, 0, 0);
    noStroke();
    ellipse(x + this.w/2, y + this.h/2, 20);
}

// Converts a game position to a draw position
GameCam.prototype.getDrawPos = function(gameX, gameY) {
    var drawX = this.zoom * (gameX - this.x);
    var drawY = this.zoom * (gameY - this.y);
    return [drawX, drawY];
};

GameCam.prototype.getDrawSize = function(gameSize) {
    return gameSize * this.zoom;
}

// Used to convert mouse position into game position
GameCam.prototype.getGamePos = function(drawX, drawY) {
    // Just the inverse function of getDrawPos
    var gameX = (drawX - width / 2) / this.zoom + this.x;
    var gameY = (drawY - height / 2) / this.zoom + this.y;
    return [gameX, gameY];
}

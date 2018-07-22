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

    this.toFollow = null;
}

// Converts the current GameCam screen into a p5 image object
GameCam.prototype.snapshot = function() {
    return this.screen.get();
}

GameCam.prototype.update = function() {
    if (this.toFollow) {
        this.x = this.toFollow.x - this.w / 2;
        this.y = this.toFollow.y - this.h / 2;
    } else {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
    }
    if (keyIsDown(87)) this.zoom += 0.05;
    if (keyIsDown(83)) this.zoom -= 0.05;
}

GameCam.prototype.follow = function(pos) {
    if (pos) {
        if (!pos.x || !pos.y) {
            console.log("GameCam.follow was expecting an object with an x and y value.");
        } else {
            this.toFollow = pos;
        }
    } else {
        this.toFollow = null;
    }
}

// Draws the GameCam screen to the canvas
GameCam.prototype.draw = function(x, y) {
    image(this.snapshot(), x, y, this.w, this.h);
    noFill();
    strokeWeight(4);
    stroke(255, 0, 0);
    rect(x, y, this.w, this.h);
    // fill(255, 0, 0);
    // noStroke();
    // ellipse(x + this.w/2, y + this.h/2, 20);
}

// Converts a game position to a draw position
GameCam.prototype.getDrawPos = function(gameX, gameY) {
    var drawX = this.zoom * (gameX - this.x - this.w / 2) + this.w / 2;
    var drawY = this.zoom * (gameY - this.y - this.h / 2) + this.h / 2;
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

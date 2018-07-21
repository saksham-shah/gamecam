function GameCam(x_, y_, w_, h_) {
    if (x_ === undefined) {
        x_ = width/2;
    }
    if (y_ === undefined) {
        y_ = height/2;
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
}

// Converts a game position to a draw position
GameCam.prototype.getDrawPos = function(gamePos) {
    var drawX = this.zoom * (gamePos.x - this.x) + width / 2;
    var drawY = this.zoom * (gamePos.y - this.y) + height / 2;
    return [drawX, drawY];
};

GameCam.prototype.getDrawSize = function(gameSize) {
    return gameSize * this.zoom;
}

// Used to convert mouse position into game position
GameCam.prototype.getGamePos = function(drawPos) {
    // Just the inverse function of getDrawPos
    var gameX = (drawPos.x - width / 2) / this.zoom + this.x;
    var gameY = (drawPos.y - height / 2) / this.zoom + this.y;
    return [gameX, gameY];
}

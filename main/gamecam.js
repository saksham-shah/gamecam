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

    this.defaultDrawX = this.x;
    this.defaultDrawY = this.y;
    this.zoom = 1;

    this.screen = createGraphics(this.w, this.h);

    this.toFollow = null;

    this.latestFrames = [];
    this.lastSnap = 0;
    this.gameclip = null;
    this.record = false;
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
        if (keyIsDown(LEFT_ARROW)) this.x -= 5 * dt;
        if (keyIsDown(UP_ARROW)) this.y -= 5 * dt;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5 * dt;
        if (keyIsDown(DOWN_ARROW)) this.y += 5 * dt;
    }
    if (keyIsDown(87)) this.zoom += 0.05 * dt;
    if (keyIsDown(83)) this.zoom -= 0.05 * dt;
    if (this.record) {
        this.takeFrameSnap();
    }
}

// Follows the position
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

// Draws the object to the screen
GameCam.prototype.draw = function(toDraw) {
    if (toDraw instanceof Function) {
        toDraw(this, this.screen);
    } else {
        toDraw.draw(this, this.screen);
    }
}

// Draws the GameCam screen to the canvas
GameCam.prototype.drawToCanvas = function(x, y) {
    if (!x) {
        x = this.defaultDrawX;
    }
    if (!y) {
        y = this.defaultDrawY;
    }
    if (this.gameclip) {
        var img = this.gameclip.next();
    } else {
        var img = this.snapshot();
    }
    if (img === false) {
        img = this.snapshot();
        this.gameclip = null;
    }
    image(img, x, y, this.w, this.h);
    noFill();
    strokeWeight(4);
    stroke(255, 0, 0);
    rect(x, y, this.w, this.h);
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

// Toggles record boolean
GameCam.prototype.record = function() {
    this.record = !this.record;
}

// Takes a snapshot and records it
GameCam.prototype.takeFrameSnap = function() {
    this.lastSnap += dt;
    if (this.lastSnap >= 0.8) {
        this.latestFrames.push(this.snapshot());
        this.lastSnap = 0;
        if (this.latestFrames.length > 300) {
            this.latestFrames.splice(0, 1);
        }
    }
}

// Returns the last 5 seconds of recording
GameCam.prototype.getGameClip = function() {
    return new GameClip(this.latestFrames.slice());
}
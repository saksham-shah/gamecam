GameCam.prototype.fill = function(colour) {
    this.screen.fill(colour);
}

GameCam.prototype.noFill = function() {
    this.screen.noFill();
}

GameCam.prototype.stroke = function(colour) {
    this.screen.stroke(colour);
}

GameCam.prototype.strokeWeight = function(weight) {
    this.screen.strokeWeight(weight);
}

GameCam.prototype.noStroke = function() {
    this.screen.noStroke();
}

GameCam.prototype.background = function(colour) {
    this.screen.background(colour);
}

GameCam.prototype.circle = function(x, y, r) {
    var drawPos = this.getDrawPos(x, y);
    this.screen.ellipse(drawPos[0], drawPos[1], this.getDrawSize(r));
}

GameCam.prototype.rect = function(x, y, w, h) {
    var drawPos = this.getDrawPos(x, y);
    this.screen.rect(drawPos[0], drawPos[1], this.getDrawSize(w), this.getDrawSize(h));
}

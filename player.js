function Player(x, y, controlled) {
	this.pos = createVector(x, y);
	this.controlled = controlled;
}

Player.prototype.update = function() {
	if (this.controlled) {
		if (keyIsDown(LEFT_ARROW)) this.pos.x -= 5 * dt;
	    if (keyIsDown(UP_ARROW)) this.pos.y -= 5 * dt;
	    if (keyIsDown(RIGHT_ARROW)) this.pos.x += 5 * dt;
	    if (keyIsDown(DOWN_ARROW)) this.pos.y += 5 * dt;
	}
}

Player.prototype.draw = function(cam, screen) {
	screen.fill(255, 0, 0);
    screen.noStroke();
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(10);
    screen.ellipse(drawPos[0], drawPos[1], drawR);
}
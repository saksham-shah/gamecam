function Player(x, y, controlled) {
	this.pos = createVector(x, y);
	this.controlled = controlled;
	this.z = 1;
	this.a = 0;
}

Player.prototype.update = function() {
	if (this.controlled) {
		if (keyIsDown(LEFT_ARROW)) this.pos.x -= 5 * dt;
	    if (keyIsDown(UP_ARROW)) this.pos.y -= 5 * dt;
	    if (keyIsDown(RIGHT_ARROW)) this.pos.x += 5 * dt;
	    if (keyIsDown(DOWN_ARROW)) this.pos.y += 5 * dt;

		if (keyIsDown(87)) this.z += 0.05 * dt;
	    if (keyIsDown(83)) this.z -= 0.05 * dt;

		if (keyIsDown(68)) this.a += 0.05 * dt;
	    if (keyIsDown(65)) this.a -= 0.05 * dt;
	}
}

Player.prototype.draw = function(cam, screen) {
	screen.fill(255, 0, 0);
    screen.noStroke();
    var drawPos = cam.getDrawPos(this.pos.x, this.pos.y);
    var drawR = cam.getDrawSize(10);
    // screen.ellipse(drawPos.x, drawPos.y, drawR);
	screen.rect(drawPos.x - drawR * 0.5, drawPos.y - drawR * 0.5, drawR, drawR)
}

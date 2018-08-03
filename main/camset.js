// Creates a GameSet
function createCamSet(type, p1, p2) {
	return new CamSet(type, p1, p2);
}

// Collection of cameras - used for e.g. multiplayer games
function CamSet(type, p1, p2) {
	this.cams = [];

	switch (type) {
		case ONE_PLAYER:
			var cam = this.addGameCam(0, 0, width, height);
			cam.follow(p1);
			break;
		case TWO_PLAYER:
			var cam1 = this.addGameCam(0, 0, width/2, height);
			cam1.follow(p1);
			var cam2 = this.addGameCam(width/2, 0, width/2, height);
			cam2.follow(p2);
			break;
	}
}

// Returns the cameras in this CamSet
CamSet.prototype.getCams = function() {
	return this.cams;
}

// Adds a GameCam
CamSet.prototype.addGameCam = function(x, y, w, h) {
	var cam = createGameCam(x, y, w, h);
	this.cams.push(cam);
	return cam;
}

// Updates all of the GameCams
CamSet.prototype.update = function() {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].update();
	}
}

// Draws the object/function to all of the GameCams
CamSet.prototype.draw = function(toDraw) {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].draw(toDraw);
	}
}

// Draws all of the GameCams to the canvas
CamSet.prototype.drawToCanvas = function() {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].drawToCanvas();
	}
}
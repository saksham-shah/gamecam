function createCamSet(type, p1, p2) {
	return new CamSet(type, p1, p2);
}

function CamSet(type, p1, p2) {
	this.cams = [];

	switch (type) {
		case 1:
			var cam = this.addGameCam(0, 0, width, height);
			cam.follow(p1);
			break;
		case 2:
			var cam1 = this.addGameCam(0, 0, width/2, height);
			cam1.follow(p1);
			var cam2 = this.addGameCam(width/2, 0, width/2, height);
			cam2.follow(p2);
			break;
	}
}

CamSet.prototype.getCams = function() {
	return this.cams;
}

CamSet.prototype.addGameCam = function(x, y, w, h) {
	var cam = createGameCam(x, y, w, h);
	this.cams.push(cam);
	return cam;
}

CamSet.prototype.update = function() {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].update();
	}
}

CamSet.prototype.draw = function(toDraw) {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].draw(toDraw);
	}
}

CamSet.prototype.drawToCanvas = function() {
	for (var i = 0; i < this.cams.length; i++) {
		this.cams[i].drawToCanvas();
	}
}
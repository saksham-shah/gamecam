var gc, img, freeze;

function setup() {
    createCanvas(600, 400);
    gc = createGameCam(0, 0, width/2, height);
    img = gc.snapshot();
}

function draw() {
    background(200);
    gc.background(0);
    gc.fill(255);
    gc.noStroke();
    gc.circle(300, 200, 100);
    gc.draw(width/2, 0);

    if (freeze) {
        image(img, 0, 0, width, height);
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) gc.x -= 5;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) gc.y -= 5;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) gc.x += 5;
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) gc.y += 5;

    // fill(255);
    // noStroke();
    // var pos = gc.getDrawPos(300, 200);
    // ellipse(pos[0], pos[1], 100);
}

function mousePressed() {
    img = gc.snapshot();
    // freeze = !freeze;
}

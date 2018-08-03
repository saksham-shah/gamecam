// var gc, img, freeze;
// var pos;
// var gcs;
var dt, lastUpdate;

var p1, p2, cs;

function setup() {
    createCanvas(600, 400);

    p1 = new Player(300, 200, true);
    p2 = new Player(300, 200, false);
    cs = createCamSet(2, p1.pos, p2.pos);
    // pos = {
    //     x: 300,
    //     y: 200
    // }
    // stillPos = {
    //     x: 300,
    //     y: 200
    // }
    // var gc1 = createGameCam(0, 0, width/2, height);
    // var gc2 = createGameCam(0, 0, width/2, height);
    // gc1.follow(pos);
    // gc2.follow(stillPos);
    // gcs = [gc1, gc2];
    // gc = createGameCam(0, 0, width, height);
    // gc.follow(pos);
    lastUpdate = Date.now();
}

function draw() {
    background(0);
    var now = Date.now();
    dt = (now - lastUpdate) / (1000 / 60); //dt will be 1 at 60fps
    lastUpdate = now;

    p1.update();
    p2.update();

    cs.update();
    cs.draw(function(cam, screen) {
        screen.background(0);
    })
    cs.draw(p1);
    cs.draw(p2);
    cs.drawToCanvas();

    // // console.log(dt);
    // if (keyIsDown(LEFT_ARROW)) pos.x -= 5 * dt;
    // if (keyIsDown(UP_ARROW)) pos.y -= 5 * dt;
    // if (keyIsDown(RIGHT_ARROW)) pos.x += 5 * dt;
    // if (keyIsDown(DOWN_ARROW)) pos.y += 5 * dt;


    // gcs[0].update();
    // gcs[1].update();

    // background(200);

    // for (var i = 0; i < gcs.length; i++) {
    //     gc = gcs[i];
    //     gc.background(0);
    //     gc.fill(color(255, 0, 0));
    //     gc.noStroke();
    //     gc.circle(pos.x, pos.y, 10);
    //     gc.fill(color(255));
    //     gc.circle(300, 200, 100);
    // }
    // gcs[0].drawToCanvas(0, 0);
    // gcs[1].drawToCanvas(width/2, 0);

    // gc.update();
    // gc.background(0);
    // gc.fill(color(255, 0, 0));
    // gc.noStroke();
    // gc.circle(pos.x, pos.y, 10);
    // gc.fill(color(255));
    // gc.circle(300, 200, 100);
    // gc.draw(0, 0);



    // fill(255);
    // noStroke();
    // var pos = gc.getDrawPos(300, 200);
    // ellipse(pos[0], pos[1], 100);
}

function mousePressed() {
    // gc.gameclip = gc.getGameClip();
    // freeze = !freeze;
}

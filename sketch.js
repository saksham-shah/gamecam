var dt, lastUpdate;

var p1, p2, cs;

function setup() {
    createCanvas(600, 400);

    p1 = new Player(300, 200, true);
    p2 = new Player(300, 200, false);
    cs = createCamSet(TWO_PLAYER, p1.pos, p2.pos, p1, p2, p1, p2);
    // cs = createCamSet(ONE_PLAYER, p1.pos, p1, p1);
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
}

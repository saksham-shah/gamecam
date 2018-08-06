// Recorded clip object - not very good yet
function GameClip(snapshots_) {
    this.snapshots = snapshots_;

    this.currentFrame = -1;
}

// Returns the next frame in the clip
GameClip.prototype.next = function() {
    this.currentFrame ++;
    if (this.currentFrame >= this.snapshots.length) {
        return false;
    } else {
        var img = this.snapshots[this.currentFrame];
    }

    return img;
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

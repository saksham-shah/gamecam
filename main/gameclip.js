function GameClip(snapshots_) {
    this.snapshots = snapshots_;

    this.currentFrame = -1;
}

GameClip.prototype.next = function() {
    this.currentFrame ++;
    if (this.currentFrame >= this.snapshots.length) {
        return false;
    } else {
        var img = this.snapshots[this.currentFrame];
    }

    return img;
}

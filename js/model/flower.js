class flower extends shape {

    constructor (size) {
        super(size);
        this.lens = returnRandomInt(1, 6);
        this.rate = returnRandomInt(7, 8);
        this.ratio = this.rate/this.lens;
    }

    display (sketch, playNote = true, strokeColor) {
        super.display(point, playNote, strokeColor);
        sketch.stroke(this.currentStrokeColor);
        sketch.fill(this.currentStrokeColor);
        sketch.noFill();
        sketch.strokeWeight(1);
        sketch.beginShape();
        for (let t = 0; t < TWO_PI * this.lens; t += 0.02) {
            let r = this.size * cos(this.ratio * t);
            sketch.vertex(this.pos.x + (r * cos(t)), this.pos.y + (r * sin(t)));
        }
        sketch.endShape();
        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);
    }

    play (sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.size * 0.01));
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
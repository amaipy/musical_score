class cloud extends shape {

    constructor(size) {
        super(size);
        this.balls = returnRandomInt(8, 14);
        this.ballSize = [];
        this.xOffset = [];
        this.yOffset = [];
        for (let i = 0; i < this.balls; i++) {
            this.ballSize[i] = returnRandomInt(20, 50);
            this.xOffset[i] = returnRandomInt(-40, 120)
            this.yOffset[i] = returnRandomInt(-30, 30)
        }
    }

    display(sketch, playNote = true, strokeColor) {
        super.display(point, playNote, strokeColor);
        let currColor = color(this.currentStrokeColor);
        sketch.strokeWeight(1);
        for (let i = 0; i < this.balls; i++) {
            currColor.setAlpha(returnRandomInt(1, 20));
            sketch.fill(currColor);
            sketch.stroke(currColor);    
            sketch.ellipse(this.xOffset[i] + this.pos.x, this.yOffset[i] + this.pos.y, this.ballSize[i] + this.size, this.ballSize[i] + this.size)
        }
        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);
    }

    play (sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.size * 0.01));
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
class cloud extends shape {

    constructor(size) {
        super(size);
        this.balls = 0;
    }

    initialize(point) {
        super.initialize(point);
        this.balls = returnRandomInt(8, 14);
        this.scale = returnRandomInt(1, 2) == 1 ? MAJOR_SCALE : MINOR_SCALE;
        this.chord = returnScale(returnRandomInt(0, 18), this.scale[0], this.scale[1]);
        this.noteRange = returnRange(this.pos.y);
        this.ballSize = [];
        this.xOffset = [];
        this.yOffset = [];
        for (let i = 0; i < this.balls; i++) {
            this.ballSize[i] = returnRandomInt(20, 50);
            this.xOffset[i] = returnRandomInt(-40, 120)
            this.yOffset[i] = returnRandomInt(-30, 30)
        }
        this.playable = false;
    }

    hide(sketch) {
        this.display(sketch, false, BACKGROUND_COLOR);
    }

    display(sketch, playNote = true, param) {
        let currColor = param ? color(param) : color(SELECTED_COLOR_SWATCH[this.color]);
        sketch.strokeWeight(1);
        for (let i = 0; i < this.balls; i++) {
            currColor.setAlpha(returnRandomInt(50, 80))
            sketch.fill(currColor)
            sketch.stroke(currColor);
            sketch.ellipse(this.xOffset[i] + this.pos.x, this.yOffset[i] + this.pos.y, this.ballSize[i] + this.size, this.ballSize[i] + this.size)
        }
        if (playNote && this.playable && PLAY_MUSIC) {
            console.log(this.chord[this.noteRange]);
            playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
        }
    }

}
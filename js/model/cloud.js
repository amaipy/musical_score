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

        if ((playNote && this.playable && PLAY_MUSIC) || strokeColor == BACKGROUND_COLOR) {
            for (let j = 0; j < this.balls / 2; j++) {
                this.draw(sketch, currColor);
            }
        }
        else this.draw(sketch, currColor);

        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);

    }

    draw (sketch, currColor) {
        for (let i = 0; i < this.balls; i++) {
            currColor.setAlpha(returnRandomInt(1, 20));
            sketch.fill(currColor);
            sketch.noStroke();
            sketch.ellipse(this.xOffset[i] + this.pos.x, this.yOffset[i] + this.pos.y, this.ballSize[i] + this.size, this.ballSize[i] + this.size)
        }
    }

    play(sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.size * 0.01));
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
class moon extends shape {

    createCirclesArray = () => {
        let ptsCircle = Array.from(Array(this.nbSamples), () => Array(2).fill(0));
        for (let i = 0; i < this.nbSamples; i++) {
            ptsCircle[i][0] = this.size * (cos(TWO_PI * (i / float(this.nbSamples))));
            ptsCircle[i][1] = this.size * (sin(TWO_PI * (i / float(this.nbSamples))));
        }
        this.ptsCircle = ptsCircle;
    };

    constructor(size) {
        super(size);
        this.nbSamples = 50;
        this.createCirclesArray();
        this.phase = returnRandomInt(8, 15);
        this.idVertexStart = -floor(map(this.phase, 0, 30, floor(this.nbSamples * 0.5), 0));
        this.idVertexEnd = floor(map(this.phase, 0, 30, floor(this.nbSamples * 0.5), 0));
        this.deltaIndex = this.idVertexEnd - this.idVertexStart;
        this.idVertexStartInsideCrescent = -floor((this.nbSamples - this.deltaIndex) * 0.5);
        this.idVertexEndInsideCrescent = floor((this.nbSamples - this.deltaIndex) * 0.5);
        this.orientation = returnRandomInt(0, 1);
    }

    changeSize (size) {
        super.changeSize(size);
        this.createCirclesArray();
    }

    display(sketch, playNote = true, strokeColor) {
        super.display(point, playNote, strokeColor);
        sketch.stroke(this.currentStrokeColor);
        sketch.fill(this.currentStrokeColor);
        sketch.push();
        sketch.translate(this.pos.x, this.pos.y);
        if (this.orientation == 1) sketch.rotate(HALF_PI + QUARTER_PI);
        sketch.strokeWeight(1);
        sketch.beginShape();
        let deltaX = 0;

        // Outside crescent
        for (let i = this.idVertexStart; i < this.idVertexEnd; i++) {
            if (i < 0) {
                sketch.vertex(this.ptsCircle[this.nbSamples + i][0], this.ptsCircle[this.nbSamples + i][1]);
            } else {
                sketch.vertex(this.ptsCircle[i][0], this.ptsCircle[i][1]);
            }
        }
        if (this.deltaIndex < this.nbSamples) {
            sketch.vertex(this.ptsCircle[this.idVertexEnd][0], this.ptsCircle[this.idVertexEnd][1]);
        }

        // to manage the translation of inside crescent
        if (this.deltaIndex > floor(this.nbSamples * 0.5)) {
            let nbIndexDelta = this.deltaIndex - floor(this.nbSamples * 0.5);
            for (let i = 0; i < nbIndexDelta; i++) {
                deltaX += this.ptsCircle[(this.nbSamples + this.idVertexStart) + i][0];
            }
        }

        // Inside crescent
        for (let i = this.idVertexEndInsideCrescent; i > this.idVertexStartInsideCrescent; i--) {
            if (i < 0) {
                sketch.vertex(this.ptsCircle[this.nbSamples + i][0] + (deltaX * 2), this.ptsCircle[this.nbSamples + i][1]);
            } else {
                sketch.vertex(this.ptsCircle[i][0] + (deltaX * 2), this.ptsCircle[i][1]);
            }
        }
        sketch.endShape(CLOSE);
        sketch.pop();
        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);
    }

    play (sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.size * 0.01));
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
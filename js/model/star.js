class star extends shape {

    constructor() {
        super(5);
        this.nPoints = returnRandomInt(5, 7);
        this.quanty = returnRandomInt(5, 10);
        this.space = [];
        for (let i = 0; i < this.quanty; i++) {
            this.space[i] = createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60));
        }
    }

    changeSize(size) {
        if (size % 2 == 0) {
            this.quanty++;
            this.space.push(createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60)));
        }
    }

    display(sketch, playNote = true, strokeColor) {
        super.display(point, playNote, strokeColor);
        sketch.stroke(this.currentStrokeColor);
        sketch.fill(this.currentStrokeColor);
        sketch.strokeWeight(this.size);
        for (let i = 0; i < this.quanty; i++) {
            let angle = TWO_PI / this.nPoints;
            let halfAngle = angle / 2.0;
            let x = this.pos.x + this.space[i].x;
            let radius1 = 0.000025;
            let radius2 = 0.0005;
            let y = this.pos.y + this.space[i].y;
            sketch.beginShape();
            for (let a = 0; a < TWO_PI; a += angle) {
                let sx = x + cos(a) * radius2;
                let sy = y + sin(a) * radius2;
                sketch.vertex(sx, sy);
                sx = x + cos(a + halfAngle) * radius1;
                sy = y + sin(a + halfAngle) * radius1;
                sketch.vertex(sx, sy);
            }
            sketch.endShape(CLOSE);
        }
        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);
    }

    play (sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.quanty * 0.01)/2);
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
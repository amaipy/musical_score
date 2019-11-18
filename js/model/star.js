class star extends shape {

    constructor(size) {
        super(size);
        this.lens = 0;
        this.rate = 0;
    }

    initialize(point) {
        super.initialize(point);
        this.size = 5;
        this.nPoints = returnRandomInt(5, 7);
        this.quanty = returnRandomInt(5, 10);
        this.space = [];
        for (let i = 0; i < this.quanty; i++) {
            this.space[i] = createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60));
        }
        this.scale = returnRandomInt(1, 2) == 1 ? MAJOR_SCALE : MINOR_SCALE;
        this.chord = returnScale(returnRandomInt(0, 18), this.scale[0], this.scale[1]);
        this.noteRange = returnRange(this.pos.y);
        this.playable = false;
    }

    changeSize(size) {
        if (size % 2 == 0) {
            this.quanty++;
            this.space.push(createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60)));
        }
    }

    hide(sketch) {
        this.display(sketch, false, BACKGROUND_COLOR);
    }

    display(sketch, playNote = true, param) {
        if (param) sketch.stroke(param);
        else sketch.stroke(SELECTED_COLOR_SWATCH[this.color]);
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

            // sketch.point(this.pos.x + this.space[i].x, this.pos.y + this.space[i].y);
        }
        if (playNote && this.playable && PLAY_MUSIC) {
            console.log(this.chord[this.noteRange]);
            playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
        }
    }

}
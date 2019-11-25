class butterfly extends shape {

    constructor (size) {
        super(size);
        this.simplex = new SimplexNoise();
        
    }

    initialize (point) {
        super.initialize(point);
        this.ts = 0.005;
        this.cs = 0.001;
        this.size = 25;
        this.ns = map(this.simplex.noise2D(this.ts, 0), -1, 1, 0.2, 1);
        this.verts = []
		let a, x, y;
		for (let r = 0; r < 10; r++) {
			a = r / 60 * TWO_PI;
			x = this.simplex.noise3D(cos(a) * this.ns, sin(a) * this.ns, this.ts) * this.size;
			y = this.simplex.noise3D(cos(a) * this.ns, sin(a) * this.ns, 40 + this.ts) * this.size;
			this.verts.push(createVector(x, y));
        }
        this.quanty = 1;
        this.space = [];
        this.space[0] = createVector(0, 0);
        this.scale = returnRandomInt(1, 2) == 1 ? MAJOR_SCALE : MINOR_SCALE;
        this.chord = returnScale(returnRandomInt(0, 18), this.scale[0], this.scale[1]);
        this.noteRange = returnRange(this.pos.y);
        this.playable = false;
    }

    changeSize(size) {
        if (size % 10 == 0) {
            this.quanty++;
            this.space.push(createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60)));
        }
    }

    hide (sketch) {
        this.display(sketch, false, BACKGROUND_COLOR);
    }

    display (sketch, playNote = true, param) {
        let currColor = param ? color(param) : color(SELECTED_COLOR_SWATCH[this.color]);
        for (let i = 0; i < this.quanty; i++) {
            sketch.push();
            sketch.stroke(currColor);
            sketch.fill(currColor);
            sketch.strokeWeight(2);
            sketch.translate(this.pos.x + this.space[i].x, this.pos.y + this.space[i].y);
            sketch.beginShape();		
            for (let r = 0; r < this.verts.length; r++){
                sketch.vertex(this.verts[r].x, this.verts[r].y);
            }
            sketch.endShape(CLOSE);
            sketch.beginShape();		
            for (let r = 0; r < this.verts.length; r++){
                sketch.vertex(-this.verts[r].x, this.verts[r].y);
            }
            sketch.endShape(CLOSE);
            sketch.pop();
            if (playNote && this.playable && PLAY_MUSIC) {
                console.log(this.chord[this.noteRange]);
                playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
            }
        }
    }

}
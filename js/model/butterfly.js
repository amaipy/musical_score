class butterfly extends shape {

    constructor (size) {
        super(size);
        this.simplex = new SimplexNoise();   
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
        this.space = [createVector(0, 0)];
    }

    changeSize(size) {
        if (size % 10 == 0) {
            this.quanty++;
            this.space.push(createVector(returnRandomInt(-180, 180), returnRandomInt(-60, 60)));
        }
    }

    display (sketch, playNote = true, strokeColor) {
        super.display(point, playNote, strokeColor);
        sketch.stroke(this.currentStrokeColor);
        sketch.fill(this.currentStrokeColor);
        for (let i = 0; i < this.quanty; i++) {
            sketch.push();
            sketch.strokeWeight(1);
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
        }
        if (playNote && this.playable && PLAY_MUSIC) this.play(sketch);
    }

    play (sketch) {
        sketch.masterVolume(MASTER_VOLUME + (this.size * 0.01));
        playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
    }

}
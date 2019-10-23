class flower extends shape {

    constructor (size) {
        super(size);
        this.lens = 0;
        this.rate = 0;
    }

    initialize (point) {
        super.initialize(point)
        this.lens = returnRandomInt(1, 6);
        this.rate = returnRandomInt(7, 8);
        this.ratio = this.rate/this.lens;
    }

    display (sketch) {
        sketch.stroke(SELECTED_COLOR_SWATCH[this.color]);
        sketch.noFill();
        sketch.strokeWeight(1);
        sketch.beginShape();
        for (let t = 0; t < TWO_PI * this.lens; t += 0.02) {
            let r = this.size * cos(this.ratio * t);
            let x = r * cos(t);
            let y = r * sin(t);
            sketch.vertex(this.pos.x+x, this.pos.y+y);
        }
        sketch.endShape();
    }

}
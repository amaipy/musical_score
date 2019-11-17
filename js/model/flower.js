class flower extends shape {

    constructor (size) {
        super(size);
        this.lens = 0;
        this.rate = 0;
    }

    initialize (point) {
        super.initialize(point);
        this.lens = returnRandomInt(1, 6);
        this.rate = returnRandomInt(7, 8);
        this.ratio = this.rate/this.lens;
        this.firstNote = this.lens * returnRandomInt(1, 3);
        this.scale = this.rate == 7 ? MAJOR_SCALE : MINOR_SCALE; 
        this.chord = returnScale(this.firstNote, this.scale[0], this.scale[1]); 
        this.noteRange = returnRange(this.pos.y);
        this.playable = false;
    }

    hide (sketch) {
        this.display(sketch, false, BACKGROUND_COLOR);
    }

    display (sketch, playNote = true, param) {
        if (param) sketch.stroke(param);
        else sketch.stroke(SELECTED_COLOR_SWATCH[this.color]);
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
        if (playNote && this.playable && PLAY_MUSIC) {
            console.log(this.chord[this.noteRange]);
            playSoundFromNote(this.constructor.name, this.chord[this.noteRange]);
        }
    }

}
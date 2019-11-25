class shape {

    constructor (size) {
        this.pos = createVector(0, 0);
        this.color = returnRandomInt(0, 4);
        this.size = size;
        this.scale = returnRandomInt(1, 2) == 1 ? MAJOR_SCALE : MINOR_SCALE;
        this.chord = returnScale(returnRandomInt(0, 18), this.scale[0], this.scale[1]);
        this.noteRange = 0;
        this.playable = false;
        this.currentStrokeColor = BACKGROUND_COLOR;
    }

    changeSize (size) {
        this.size = size;
    }

    initialize (point) {
        this.pos = point;
        this.noteRange = returnRange(this.pos.y);
    }

    hide (sketch) {
        this.display(sketch, false, BACKGROUND_COLOR);
    }

    display (sketch, playNote = true, strokeColor) {
        this.currentStrokeColor = strokeColor ? strokeColor : SELECTED_COLOR_SWATCH[this.color];
    }

}
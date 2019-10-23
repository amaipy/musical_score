class shape {

    constructor (size) {
        this.pos = createVector(0, 0);
        this.color = returnRandomInt(0, 4);
        this.size = size;
    }

    changeSize (size) {
        this.size = size;
    }

    initialize (point) {
        this.pos = point;
    }

    display () {}

}
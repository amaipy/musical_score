let SELECTED_COLOR_SWATCH = returnRandom(GLOBAL_SWATCHES);
let SELECTED_BUTTON = '';
let size = 40;
let CURRENT_ELEMENT = null;
let ELEMENTS = [];

const selectButton = (id) => {
    if (document.getElementById(id).className.indexOf('btnsSelected') != -1) {
        document.getElementById(id).className = document.getElementById(id).className.replace('btnsSelected', '');
        SELECTED_BUTTON = '';
    }
    else {
        if (document.getElementsByClassName('btnsSelected').length == 0) {
            document.getElementById(id).className = document.getElementById(id).className + ' btnsSelected';
            SELECTED_BUTTON = id;
        }
    }

};


const s = (sketch) => {

    sketch.mousePressed = () => {
        size = 20;
    };

    sketch.mouseReleased = () => {
        if (CURRENT_ELEMENT) {
            ELEMENTS.push(CURRENT_ELEMENT);
        }
        CURRENT_ELEMENT = null;

    };

    sketch.setup = () => {
        sketch.createCanvas(1000, 1000);
        sketch.background("#000000");
    };

    sketch.draw = () => {
        sketch.background("#000000");
        if (sketch.mouseIsPressed) {
            size += 1;
            if (SELECTED_BUTTON != '' && sketch.pmouseX > 0 && sketch.pmouseY > 0) {
                if (CURRENT_ELEMENT) {
                    CURRENT_ELEMENT.changeSize(size);
                    CURRENT_ELEMENT.display(sketch);
                }
                else {
                    let pos = createVector(sketch.pmouseX, sketch.pmouseY);
                    switch (SELECTED_BUTTON) {
                        case 'flower-button':
                            CURRENT_ELEMENT = new flower(size);
                            CURRENT_ELEMENT.initialize(pos);
                            CURRENT_ELEMENT.display(sketch);
                            break;
                    }
                }
            }
        }
        ELEMENTS.forEach(element => {
            element.display(sketch);
        });
    };

};


new p5(s, 'canvas');
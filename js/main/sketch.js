
let SELECTED_BUTTON = '';
let size = RESETED_SIZE;
let CURRENT_ELEMENT = null;
let ELEMENTS = [];
let CURRENT_INDEX = 0;

let CURRENT_TIMER = DEFAULT_TIMER;

const s = (sketch) => {

    sketch.masterVolume(MASTER_VOLUME); 

    sketch.mousePressed = () => {
        size = RESETED_SIZE;
    };

    sketch.mouseReleased = () => {
        if (CURRENT_ELEMENT) {
            CURRENT_ELEMENT.hide(sketch);
            CURRENT_ELEMENT.playable = true;
            ELEMENTS.push(CURRENT_ELEMENT);
        }
        CURRENT_ELEMENT = null;
    };

    sketch.setup = () => {
        sketch.createCanvas(windowWidth-BAR_WIDTH, windowHeight);
        sketch.background(BACKGROUND_COLOR);
        change_color('palet-' + SWATCHES_NAMES[GLOBAL_SWATCHES.indexOf(SELECTED_COLOR_SWATCH)]);
    };

    sketch.windowResized = () => {
        sketch.resizeCanvas(windowWidth-BAR_WIDTH, windowHeight);
    };

    sketch.draw = () => {

        if (TAKE_SNAPSHOT) {
            let return_music = false;
            if (PLAY_MUSIC) {
                return_music = true;
                PLAY_MUSIC = false;
            }
            ELEMENTS.forEach(element => element.display(sketch));
            sketch.saveCanvas('musical_score', 'jpg');
            ELEMENTS.forEach(element => element.hide(sketch));
            TAKE_SNAPSHOT = false;
            PLAY_MUSIC = return_music;
        }

        if (CHANGE_PALET) {
            sketch.background(BACKGROUND_COLOR); 
            CHANGE_PALET = false
        }

        if (RESET_CANVA) {
            sketch.background(BACKGROUND_COLOR);
            ELEMENTS = [];
            CURRENT_INDEX = 0;
            RESET_CANVA = false;    
        }
        
        if (sketch.mouseIsPressed) {
            size += 1;
            if (SELECTED_BUTTON != '' && sketch.mouseX > 0 && sketch.mouseY > 0) {
                if (CURRENT_ELEMENT) {
                    CURRENT_ELEMENT.hide(sketch);
                    CURRENT_ELEMENT.changeSize(size);
                    CURRENT_ELEMENT.display(sketch);
                }
                else {
                    switch (SELECTED_BUTTON) {
                        case 'flower-button':
                            CURRENT_ELEMENT = new flower(size);
                            break;
                        case 'cloud-button':
                            CURRENT_ELEMENT = new cloud(size);
                            break;
                        case 'star-button':
                            CURRENT_ELEMENT = new star(size);
                            break;
                        case 'moon-button':
                            CURRENT_ELEMENT = new moon(size);
                            break;
                        case 'butterfly-button':
                            CURRENT_ELEMENT = new butterfly(size);  
                            break;
                    }
                    if (CURRENT_ELEMENT) {
                        CURRENT_ELEMENT.initialize(createVector(sketch.mouseX, sketch.mouseY));
                        CURRENT_ELEMENT.display(sketch);         
                    }
                }
            }
        }
        
        if (frameCount % 60 == 0 && ELEMENTS.length > 0 && CURRENT_TIMER > 0) CURRENT_TIMER --;
        
        if (CURRENT_TIMER == 0 && ELEMENTS.length > 0) { 
            if (CURRENT_INDEX > 0) ELEMENTS[CURRENT_INDEX-1].hide(sketch);    
            if (CURRENT_INDEX == ELEMENTS.length) CURRENT_INDEX = 0;
            ELEMENTS[CURRENT_INDEX].display(sketch);
            CURRENT_INDEX++;
            CURRENT_TIMER = DEFAULT_TIMER;
        }
        
    };

};

new p5(s, 'canvas');
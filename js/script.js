let SELECTED_COLOR_SWATCH = returnRandom(GLOBAL_SWATCHES);
let SELECTED_BUTTON = '';

let size = RESETED_SIZE;
let CURRENT_ELEMENT = null;
let ELEMENTS = [];
let CURRENT_INDEX = 0;

let CURRENT_TIMER = DEFAULT_TIMER;

let pause = "M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z",
   play = "M 600,1200 C 268.65,1200 0,931.35 0,600 0,268.65 268.65,0 600,0 c 331.35,0 600,268.65 600,600 0,331.35 -268.65,600 -600,600 z M 450,300.45 450,899.55 900,600 450,300.45 z";

const changePausePlay = () => {
    PLAY_MUSIC = !PLAY_MUSIC;
    let animation = document.getElementById('animation');
    animation.setAttribute('from', PLAY_MUSIC ? play : pause);
    animation.setAttribute('to', PLAY_MUSIC ? pause : play);
    animation.beginElement();
}; 

const gainSpeed = () => {
    DEFAULT_TIMER -= 1;
};

const lossSpeed = () => {
    DEFAULT_TIMER += 1;
};

const selectButton = (id) => {
    if (document.getElementById(id).className.indexOf('btnsSelected') != -1) {
        document.getElementById(id).className = document.getElementById(id).className.replace('btnsSelected', '');
        SELECTED_BUTTON = '';
    }
    else {
        let selectedButton = document.getElementsByClassName('btnsSelected');
        if (selectedButton.length > 0) {
            selectedButton[0].className = document.getElementById(id).className.replace('btnsSelected', '');
        }
        document.getElementById(id).className = document.getElementById(id).className + ' btnsSelected';
        SELECTED_BUTTON = id;
    }
};

const s = (sketch) => {

    sketch.masterVolume(0.8); 

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
        sketch.createCanvas(1000, 1000);
        sketch.background(BACKGROUND_COLOR);
    };

    sketch.draw = () => {
        //sketch.background(BACKGROUND_COLOR);
        if (sketch.mouseIsPressed) {
            size += 1;
            if (SELECTED_BUTTON != '' && sketch.pmouseX > 0 && sketch.pmouseY > 0) {
                if (CURRENT_ELEMENT) {
                    CURRENT_ELEMENT.hide(sketch);
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
        if (frameCount % 60 == 0 && ELEMENTS.length > 0 && CURRENT_TIMER > 0) {
            CURRENT_TIMER --;
        }
        if (CURRENT_TIMER == 0 && ELEMENTS.length > 0) { 
            if (CURRENT_INDEX > 0) {
                ELEMENTS[CURRENT_INDEX-1].hide(sketch);    
            }
            if (CURRENT_INDEX == ELEMENTS.length) CURRENT_INDEX = 0;
            ELEMENTS[CURRENT_INDEX].display(sketch);
            CURRENT_INDEX++;
            CURRENT_TIMER = DEFAULT_TIMER;
        }
        
    };

};


new p5(s, 'canvas');
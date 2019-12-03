let RESET_CANVA = false;
let CHANGE_PALET = false;
let TAKE_SNAPSHOT = false;
let SELECTED_COLOR_SWATCH = returnRandom(GLOBAL_SWATCHES);
let PALET_CLASS = 'icon-palet';
let SELECTED_BUTTON_CLASS = 'btnsSelected'

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

const resetAllCanva = () => {
    RESET_CANVA = true;
};

const snapshot = () => {
    TAKE_SNAPSHOT = true;
};

const selectButton = (id) => {
    let className = document.getElementById(id).className;
    if (className.indexOf(SELECTED_BUTTON_CLASS) != -1) {
        document.getElementById(id).className = className.replace(SELECTED_BUTTON_CLASS, '').replace(id.replace('-button', ''), '');
        SELECTED_BUTTON = '';
    }
    else {
        let selectedButton = document.getElementsByClassName(SELECTED_BUTTON_CLASS);
        if (selectedButton.length > 0) {
            selectedButton[0].className = className.replace('btnsSelected', '').replace(id.replace('-button', ''), '');
        }
        document.getElementById(id).className = className + ' ' + SELECTED_BUTTON_CLASS + ' ' + id.replace('-button', '');
        SELECTED_BUTTON = id;
    }
};

const change_color = (id) => {
    let current = 'palet-' + SWATCHES_NAMES[GLOBAL_SWATCHES.indexOf(SELECTED_COLOR_SWATCH)];
    document.getElementById(current).className =  PALET_CLASS;
    document.getElementById(id).className = PALET_CLASS + ' focus';
    let swatch = id.replace('palet-', '');
    SELECTED_COLOR_SWATCH = GLOBAL_SWATCHES[SWATCHES_NAMES.indexOf(swatch)];
    CHANGE_PALET = true;
};
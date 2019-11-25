let RESET_CANVA = false;

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

const selectButton = (id) => {
    let className = document.getElementById(id).className;
    if (className.indexOf('btnsSelected') != -1) {
        document.getElementById(id).className = className.replace('btnsSelected', '').replace(id.replace('-button', ''), '');
        SELECTED_BUTTON = '';
    }
    else {
        let selectedButton = document.getElementsByClassName('btnsSelected');
        if (selectedButton.length > 0) {
            selectedButton[0].className = className.replace('btnsSelected', '').replace(id.replace('-button', ''), '');
        }
        document.getElementById(id).className = className + ' btnsSelected' + ' ' + id.replace('-button', '');
        SELECTED_BUTTON = id;
    }
};


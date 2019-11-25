new p5();

let DEFAULT_TIMER = 50;
const RESETED_SIZE = 20;
const MASTER_VOLUME = 0.8;
let BAR_WIDTH = 180;
const BACKGROUND_COLOR = '#000000';

let PLAY_MUSIC = false;

const returnRandom = (array) => array[Math.floor(Math.random() * array.length)];

const returnRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



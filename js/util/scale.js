const MUSICAL_SCALE = [
    'B3',
    'C4', 
    'Db4', 
    'D4', 
    'Eb4', 
    'E4', 
    'F4', 
    'Fsharp4', 
    'G4', 
    'Gsharp4', 
    'A4', 
    'Bb4', 
    'B4',
    'C5', 
    'Db5', 
    'D5', 
    'Eb5', 
    'E5', 
    'F5'
];

const ALL_INSTRUMENTS = [
    'cloud',
    'flower',
    'butterfly',
    'moon',
    'star'
];

const TOTAL_SOUNDS = MUSICAL_SCALE.length * ALL_INSTRUMENTS.length;

const ALL_SOUNDS = Array.from(Array(ALL_INSTRUMENTS.length), () => Array(MUSICAL_SCALE.length).fill(0))

const MAJOR_SCALE = [4, 3];

const MINOR_SCALE = [3, 4];

const FILE_PATH = 'assets/sounds/';

const FILE_EXT = '.wav';

const returnScale = (first, second, third) => {
    let result = [MUSICAL_SCALE[first]];
    if (first + second >= MUSICAL_SCALE.length) {
        second = first + second - MUSICAL_SCALE.length;
    }
    else {
        second = first + second;
    }
    result.push(MUSICAL_SCALE[second]);
    if (second + third >= MUSICAL_SCALE.length) {
        third = third + second - MUSICAL_SCALE.length;
    }
    else {
        third = second + third;
    }
    result.push(MUSICAL_SCALE[third]);
    return result;
};

const returnRange = (currentY) => {
    while (currentY >= RESETED_SIZE*3) {
        currentY -= RESETED_SIZE;
    }
    if (currentY >= 0 && currentY <= RESETED_SIZE) {
        return 0;
    }
    if (currentY > RESETED_SIZE && currentY <= RESETED_SIZE*2) {
        return 1;
    }
    return 2;
};

const loadInstruments = () => {
    for (let i = 0, curr = 0, aux = 0; curr < ALL_INSTRUMENTS.length; i++, aux++) {
        if (aux % 19 == 0 && aux != 0) {
            curr++;
            aux = 0;
        }
        if (curr == ALL_INSTRUMENTS.length) break;
        ALL_SOUNDS[curr][aux] = loadSound(FILE_PATH + ALL_INSTRUMENTS[curr] + '/' + (MUSICAL_SCALE[aux]) + FILE_EXT);
    }
};

const playSoundFromNote = (instrument, note) => {
    ALL_SOUNDS[ALL_INSTRUMENTS.indexOf(instrument)][MUSICAL_SCALE.indexOf(note)].play();
};

loadInstruments();


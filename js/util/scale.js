const MUSICAL_SCALE = [
    'B3',
    'C4', 
    'Db4', 
    'D4', 
    'Eb4', 
    'E4', 
    'F4', 
    'F#4', 
    'G4', 
    'G#4', 
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

const MAJOR_SCALE = [4, 3];

const MINOR_SCALE = [3, 4];

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
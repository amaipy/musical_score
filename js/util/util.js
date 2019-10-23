new p5();

const returnRandom = (array) => array[Math.floor(Math.random() * array.length)];

const returnRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

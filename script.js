const s = (sketch) => {
    let x = 100;
    let y = 100;

    let pink = false;

    createPink = () => {
        pink = true;

    }

    deletePink = () => {
        pink = false;

    }

    sketch.setup = () => {
        sketch.createCanvas(200, 200);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x, y, 50, 50);
        if (pink) {
            sketch.rect(x, y, 100, 100);
        }
    };


};

new p5(s, 'canvas');
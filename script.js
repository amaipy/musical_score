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
	
	let k = 2/7.0;

    sketch.setup = () => {
		sketch.createCanvas(400, 400);
		sketch.background("#129575");
		sketch.colorMode("HSB");
		sketch.strokeWeight(0.01);
    };

    sketch.draw = () => {
        sketch.translate(sketch.width/2, sketch.height/2);
		  sketch.scale(200, 200);
		  let t = sketch.frameCount / 20.0;
		  let x = sketch.cos(k*t) * sketch.sin(t);
		  let y = sketch.cos(k*t) * sketch.cos(t); 
		  sketch.stroke(255);
		  sketch.line(0, 0, x, y);
    };
	
	


};

new p5(s, 'canvas');
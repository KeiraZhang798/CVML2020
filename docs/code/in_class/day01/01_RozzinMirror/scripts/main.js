//Helloooooooooo-".."file upper menu/"."current file 

let myCapture;
let r = 0.0;

function setup() {
  //createCanvas(320, 240);
  let canvas = createCanvas(640, 480);

  canvas.parent("sketch");
  myCapture = createCapture(VIDEO);
  myCapture.hide();
  fill(0,240,0,80);
  noStroke();
}

function draw() {
  background(0,0,200);
  //fill(random(255),random(255),random(255));-really flashing
  
  // load pixel data to myCapture object
  myCapture.loadPixels();

  const stepSize = round(constrain(mouseX / 8, 6, 32));
  
  //const stepSize = round(constrain(mouseX / 8, 6, 50));
  
  for(let y = 0; y < height; y+=stepSize) {
    for(let x = 0; x < width; x+=stepSize) {
      const i = y * width + x; 
      //print(myCapture.pixels[1*4])
      const darkness = (255 - myCapture.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
    //fill(random(0,255),random(0,205),random(0,200));
      ellipse(x, y, radius, radius);
      //rect(x, y, radius, random(1, 30));
      //triangle(x, y, x*radius, y-radius, random(1, 10), random(2, 20))
      
      push();
      translate(width, 0);
      scale(-1, 1);
      rect(x, y, radius, radius);
      pop();
      
      
    }
  }
}
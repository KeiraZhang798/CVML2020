let capture;
let fallingLetters = [];
let w = 640;
let h = 480;
let brightnessThreshold = 80; // change this based on your physical environment


function setup() {
  // set up video
  capture = createCapture(VIDEO);
  capture.hide();
  // frameRate(60);
  // pixelDensity(1);
  createCanvas(w, h);
  
  textSize(16);
  
  
  // some text to work with
  let sourceText = "rain chars keep fallin' on my head";
  
  // the initial character's x-position
  let x = 20;
  
  // the amount of horizontal space we want between the letters
  let xSpacing = 14;
  
  // loop through each character in the poem string created above
  for(let c of sourceText) {
    
    // for each character from poem, create a FallingLetter object and
    // add it to the characters array
    fallingLetters.push(new FallingLetter(c, x, 14));
    
    // increase the initial x position for each character
    // we add to the characters array.
    x+=xSpacing;
  }
}

function draw() {
  background(255);
  
  // flip the image so that it is mirrored correctly
  push();
    translate(width, 0);
    scale(-1, 1);
    image(capture, 0, 0, w, h);
  pop();
  capture.loadPixels();
    
  // loop through each FallingLetter object
    for(let i = 0; i < fallingLetters.length; i++) {
      
      // while the FallingLetter is not at the top of the screen AND
      // it's touch a dark area that is below our threshold, move the letter up
      while(fallingLetters[i].y > 0 && getBrightness(capture.pixels, i) < brightnessThreshold) {
        fallingLetters[i].y=fallingLetters[i].y+20;
      }
      
      // if a character reaches the bottom of the screen, reset it to the top
      if(fallingLetters[i].y >= h) {
        fallingLetters[i].y = 0;
        
        // otherwise, make the character descend.
      } else {
        fallingLetters[i].y++;
      }
    }
  
  //for(let fl of fallingLetters) {
   // let r=random(14,100);
    //fill(255, 0, 0);
    //text(fl.c, fl.x, fl.y);
 // }  
  for(let fl of fallingLetters) {
    
    let r_r 
  let r_g 
  let r_b 
  let r_size
  if (frameCount % 2 == 0) {
    r_r = random(0, 255);
    r_g = random(0, 255);
    r_b = random(0, 255);
    r_size = random(14, 100);
  }
  for (let fl of fallingLetters) {

    fill(r_r, r_g, r_b);
    textSize(r_size)
    text(fl.c, fl.x, fl.y+10);
  }
  }
}

// getBrightness calculates the brightness value of a pixel at particular
// location. It accepts two arguments: an array of pixels (which we'll be
// taking from our webcam) and an index value (which we'll be using to
// choose which FallingLetter to deal with).
function getBrightness(_pixels, _i) {
  
  // create a placeholder variable so we don't have to type as much
  let fl = fallingLetters[_i]; 
  
  // convert the (x, y) coordinate of the current camera feed pixel into
  // its single-dimensional array version. Note that we use (w-fl.x). That
  // is because we're mirroring our webcam feed when we draw it, and so we
  // need to make sure we "mirror" the pixel on which we're calculating the
  // brightness
  
  let index = ((w-fl.x) + (fl.y * w)) * 4;
  
  let r = _pixels[index];
  let g = _pixels[index+1];
  let b = _pixels[index+2];
  
  let colorTotal = r + g + b;
  let brightness = colorTotal/3.0; // a number out of 255
  
  return brightness;
}


class FallingLetter {
  
  constructor(_char, _x, _y) {
    this.c = _char;
    this.x = _x;
    this.y = _y;
  }
}
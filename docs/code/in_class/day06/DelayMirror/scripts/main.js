let w = 640;
let h = 480;

let tmpData = [];
let tmpImage = [];
let frameW = 128;
let frameH = 96;
let threshold = 100;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  //capture.hide();
}


function draw() {
  capture.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let avg = 0;
      tmpData[index] = capture.pixels[index];
      tmpData[index + 1] = capture.pixels[index + 1];
      tmpData[index + 2] = capture.pixels[index + 2];
      tmpData[index + 3] = capture.pixels[index + 3];
      tmpImage[index] = capture.pixels[index];
      tmpImage[index + 1] = capture.pixels[index + 1];
      tmpImage[index + 2] = capture.pixels[index + 2];
      tmpImage[index + 3] = capture.pixels[index + 3];

      //let a = edgeDetection(index, x, y);
      // tmpData[index] = a;
      // tmpData[index + 1] = a;
      // tmpData[index + 2] = a;
      // tmpData[index + 3] = capture.pixels[index + 3];
      
      let b = (capture.pixels[index] + capture.pixels[index + 1] + capture.pixels[index + 2]) / 3;
      if (b > threshold) {
        b = 0;
      } else {
        b = 255;
      }
      tmpData[index] = b;
      tmpData[index + 1] = b;
      tmpData[index + 2] = b;
      tmpData[index + 3] = capture.pixels[index + 3];

    }
  }

  for (let i = 0; i < w/frameW; i++) {
    for (let j = 0; j < h/frameH; j++) {
      for (let y = 0; y < frameH; y++) {
        for (let x = 0; x < frameW; x++) {
          x1 = x + (frameW * j);
          y1 = y + (frameH * i);
          x2 = (i + 1) * (x % frameW)
          y2 = (j + 1) * (y % frameH)
          let index = (x1 + y1 * width) * 4;
          let index2 = (x2 + y2 * width) * 4;
          capture.pixels[index] = tmpData[index2];
          capture.pixels[index + 1] = tmpData[index2 + 1];
          capture.pixels[index + 2] = tmpData[index2 + 2];
          capture.pixels[index + 3] = tmpData[index2 + 3];
        }
      }
    }
  }

  capture.updatePixels();
  image(capture, 0, 0);
  //const cs = 50;
  const cs = 100;
  // const stepSize = 4;
  const stepSize = round(constrain(mouseX / 8, 12, 40));

  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - tmpImage[i * 4]) / 255;
      const radius = stepSize * darkness - 10;
      // let c = color(random(255), random(255), random(255))
      let c = color(cs, cs, cs)
      fill(c)
      noStroke()
      ellipse(x, y, radius, radius);
    }
  }
}



function edgeDetection(i, x, y) {

  let index0 = ((x) + (y) * width) * 4;
  let index1 = ((x - 1) + (y - 1) * width) * 4;
  let index2 = ((x - 1) + (y) * width) * 4;
  let index3 = ((x - 1) + (y + 1) * width) * 4;
  let index4 = ((x) + (y - 1) * width) * 4;
  let index5 = ((x) + (y + 1) * width) * 4;
  let index6 = ((x + 1) + (y - 1) * width) * 4;
  let index7 = ((x + 1) + (y) * width) * 4;
  let index8 = ((x + 1) + (y + 1) * width) * 4;

  let r;
  r = 0 + (capture.pixels[index0] + capture.pixels[index0 + 1] + capture.pixels[index0 + 2]) / 3 * (8);
  r = r - (capture.pixels[index1] + capture.pixels[index1 + 1] + capture.pixels[index1 + 2]) / 3;
  r = r - (capture.pixels[index2] + capture.pixels[index2 + 1] + capture.pixels[index2 + 2]) / 3;
  r = r - (capture.pixels[index3] + capture.pixels[index3 + 1] + capture.pixels[index3 + 2]) / 3;
  r = r - (capture.pixels[index4] + capture.pixels[index4 + 1] + capture.pixels[index4 + 2]) / 3;
  r = r - (capture.pixels[index5] + capture.pixels[index5 + 1] + capture.pixels[index5 + 2]) / 3;
  r = r - (capture.pixels[index6] + capture.pixels[index6 + 1] + capture.pixels[index6 + 2]) / 3;
  r = r - (capture.pixels[index7] + capture.pixels[index7 + 1] + capture.pixels[index7 + 2]) / 3;
  r = r - (capture.pixels[index8] + capture.pixels[index8 + 1] + capture.pixels[index8 + 2]) / 3;

  return r;
}
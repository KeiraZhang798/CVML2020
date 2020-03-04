let canvas;
let capture;

let w = 640;
let h = 480;

let changeStage = false;

//the still frame
// let tempCapture;

let oldData = [];
let newData = [];
let tmpData = [];
let tmpIndex = [];

const NUM_OF_BLOCK = 18;
const MAX_NUM_OF_FREEZE = 11;

function setup() {
  createCanvas(w, h);
  capture = createCapture(VIDEO);
  pixelDensity(1);
  //create this data mapping
  imageMap()

  //capture.hide();
}

function draw() {

  let a;
  background(255);

  capture.loadPixels();
  for (let i = 0; i < NUM_OF_BLOCK; i++) {
    for (let y = 0; y < newData[i][3]; y++) {
      for (let x = 0; x < newData[i][2]; x++) {
        let index1 = ((newData[i][0] + x) + (newData[i][1] + y) * width) * 4;
        let index2 = ((oldData[i][0] + x) + (oldData[i][1] + y) * width) * 4;
        // let a  = edgeDetection(index2);
        capture.pixels[index1] = capture.pixels[index2];
        capture.pixels[index1 + 1] = capture.pixels[index2 + 1];
        capture.pixels[index1 + 2] = capture.pixels[index2 + 2];
        capture.pixels[index1 + 3] = capture.pixels[index2 + 3];
      }
    }
  }
  if (changeStage) {
    for (let i = 0; i < MAX_NUM_OF_FREEZE; i++) {
      for (let y = 0; y < newData[tmpIndex[i]][3]; y++) {
        for (let x = 0; x < newData[tmpIndex[i]][2]; x++) {
          let index1 = ((newData[tmpIndex[i]][0] + x) + (newData[tmpIndex[i]][1] + y) * width) * 4;
          let index2 = ((oldData[tmpIndex[i]][0] + x) + (oldData[tmpIndex[i]][1] + y) * width) * 4;
          capture.pixels[index1] = tmpData[index2];
          capture.pixels[index1 + 1] = tmpData[index2 + 1];
          capture.pixels[index1 + 2] = tmpData[index2 + 2];
          capture.pixels[index1 + 3] = tmpData[index2 + 3];
        }
      }
    }
  } 


  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      capture.pixels[index] = capture.pixels[index];
      capture.pixels[index + 1];
      capture.pixels[index + 2];
      capture.pixels[index + 3];
    }
  }

  capture.updatePixels();
  image(capture,0,0)
  
  const stepSize = round(constrain(mouseX / 8, 6, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - capture.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      // let c = color(random(255), random(255), random(255))
      let c = color(0, 0, 0)
      fill(c)
      rect(x, y, radius, radius);
    }
  }



  //   filter(THRESHOLD)
}

function mouseClicked() {

  capture.loadPixels();
  console.log(tmpIndex);

  if (changeStage == false) {
    changeStage = true;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      tmpData[index] = capture.pixels[index];
      tmpData[index + 1] = capture.pixels[index + 1];
      tmpData[index + 2] = capture.pixels[index + 2];
      tmpData[index + 3] = capture.pixels[index + 3];
    }
  }
  let a, b;
  for (let i = 0; i < MAX_NUM_OF_FREEZE; i++) {
    tmpIndex[i] = int(random(0, NUM_OF_BLOCK - 1));
  }
}

function imageMap() {
  // create 2d array declaration
  for (let x = 0; x < NUM_OF_BLOCK; x++) {
    oldData[x] = [0, 0, 0, 0];
    newData[x] = [0, 0, 0, 0];
  }

  //A
  newData[0] = [0, 0, 640, 120];
  oldData[0] = [320, 120, 320, 60];
  //B
  newData[1] = [0, 120, 40, 280];
  oldData[1] = [320, 180, 40, 280];
  //C
  newData[2] = [600, 120, 40, 280];
  oldData[2] = [80, 80, 60, 400];
  //D
  newData[3] = [40, 120, 80, 280];
  oldData[3] = [560, 180, 80, 260];
  //E
  newData[4] = [360, 120, 80, 280];
  oldData[4] = [360, 180, 80, 280];
  //F
  newData[5] = [120, 120, 40, 280];
  oldData[5] = [160, 120, 40, 280];
  //G
  newData[6] = [180, 120, 20, 280];
  oldData[6] = [140, 120, 20, 280];
  //H
  newData[7] = [200, 120, 80, 280];
  oldData[7] = [200, 120, 80, 280];
  //I
  newData[8] = [280, 120, 40, 280];
  oldData[8] = [440, 180, 40, 280];
  //J
  newData[9] = [320, 120, 40, 280];
  oldData[9] = [0, 120, 40, 280];
  //K
  newData[10] = [440, 120, 60, 280];
  oldData[10] = [0, 0, 280, 60];
  //L
  newData[11] = [140, 400, 80, 80];
  oldData[11] = [280, 0, 100, 80];
  //M
  newData[12] = [0, 400, 140, 80];
  oldData[12] = [140, 400, 140, 80];
  //N
  newData[13] = [220, 400, 80, 80];
  oldData[13] = [480, 180, 80, 80];
  //O
  newData[14] = [300, 400, 140, 80];
  oldData[14] = [500, 0, 140, 80];
  //P
  newData[15] = [440, 400, 40, 80];
  oldData[15] = [380, 0, 40, 80];
  //Q
  newData[16] = [480, 400, 160, 80];
  oldData[16] = [480, 260, 60, 80];
  //R
  newData[17] = [580, 400, 100, 80];
  oldData[17] = [480, 340, 140, 100];
}


// for (let y = 0; y < tmpData[i].height; y++) {
//   for (let x = 0; x < tmpData[i].width; x++) {
//     let red = random(255);
//     let green = random(255);
//     let blue = random(255);
//     let alpha = 255;
//     writeColor(tmpData[i], x, y, red, green, blue, alpha);
//   }
// }

// function writeColor(image, x, y, red, green, blue, alpha) {
//   let index = (x + y * width) * 4;
//   image.pixels[index] = red;
//   image.pixels[index + 1] = green;
//   image.pixels[index + 2] = blue;
//   image.pixels[index + 3] = alpha;
// }

//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       let i = (width - x + 1 + (y * width)) * 4;
//       capture.pixels[i + 0]; = capture.pixels[i + 0];
//       var g = capture.pixels[i + 1];
//       var b = capture.pixels[i + 2];
//       pixels[]
//     }
//   }
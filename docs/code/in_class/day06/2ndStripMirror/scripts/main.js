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
let tmpImage = [];
let tmpIndex = [];

const NUM_OF_BLOCK = 13;
const NUM_OF_FREEZE = 6;
let FREEZE = [1, 3, 5, 7, 9, 11];
let FREE = [0, 2, 4, 6, 8, 10, 12];


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
  if (changeStage == 0) {
    for (let i = 0; i < NUM_OF_BLOCK; i++) {
      for (let y = 0; y < newData[i][3]; y++) {
        for (let x = 0; x < newData[i][2]; x++) {
          let index1 = ((newData[i][0] + x) + (newData[i][1] + y) * width) * 4;
          let index2 = ((oldData[i][0] + x) + (oldData[i][1] + y) * width) * 4;
          tmpImage[index1] = capture.pixels[index2];
          tmpImage[index1 + 1] = capture.pixels[index2 + 1];
          tmpImage[index1 + 2] = capture.pixels[index2 + 2];
          tmpImage[index1 + 3] = capture.pixels[index2 + 3];
          let a = edgeDetection(i, x, y);
          capture.pixels[index1] = a;
          capture.pixels[index1 + 1] = a;
          capture.pixels[index1 + 2] = a;
          capture.pixels[index1 + 3] = capture.pixels[index2 + 3];
        }
      }
    }
  } else if (changeStage > 0) {
    for (let i = 0; i < NUM_OF_BLOCK; i++) {
      for (let y = 0; y < newData[i][3]; y++) {
        for (let x = 0; x < newData[i][2]; x++) {
          let index1 = ((newData[i][0] + x) + (newData[i][1] + y) * width) * 4;
          let index2 = ((oldData[i][0] + x) + (oldData[i][1] + y) * width) * 4;
          tmpImage[index1] = capture.pixels[index2];
          tmpImage[index1 + 1] = capture.pixels[index2 + 1];
          tmpImage[index1 + 2] = capture.pixels[index2 + 2];
          tmpImage[index1 + 3] = capture.pixels[index2 + 3];
          let a = edgeDetection(i, x, y);
          capture.pixels[index1] = a;
          capture.pixels[index1 + 1] = a;
          capture.pixels[index1 + 2] = a;
          capture.pixels[index1 + 3] = capture.pixels[index2 + 3];
        }
      }
    }
    for (let i = 0; i < NUM_OF_FREEZE; i++) {
      for (let y = 0; y < newData[FREEZE[i]][3]; y++) {
        for (let x = 0; x < newData[FREEZE[i]][2]; x++) {
          let index1 = ((newData[FREEZE[i]][0] + x) + (newData[FREEZE[i]][1] + y) * width) * 4;
          let index2 = ((oldData[FREEZE[i]][0] + x) + (oldData[FREEZE[i]][1] + y) * width) * 4;
          let a = edgeDetection2(i, x, y);
          capture.pixels[index1] = a;
          capture.pixels[index1 + 1] = a;
          capture.pixels[index1 + 2] = a;
          capture.pixels[index1 + 3] = tmpData[index2 + 3];
        }
      }
    }
  } else if (changeStage == 2) {
    for (let i = 0; i < NUM_OF_BLOCK - NUM_OF_FREEZE; i++) {
      for (let y = 0; y < newData[FREE[i]][3]; y++) {
        for (let x = 0; x < newData[FREE[i]][2]; x++) {
          let index1 = ((newData[FREE[i]][0] + x) + (newData[FREE[i]][1] + y) * width) * 4;
          let index2 = ((oldData[FREE[i]][0] + x) + (oldData[FREE[i]][1] + y) * width) * 4;
          let a = edgeDetection2(i, x, y);
          capture.pixels[index1] = a;
          capture.pixels[index1 + 1] = a;
          capture.pixels[index1 + 2] = a;
          capture.pixels[index1 + 3] = tmpData[index2 + 3];
        }
      }
    }
  }


  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     let index = (x + y * width) * 4;
  //     capture.pixels[index] = capture.pixels[index];
  //     capture.pixels[index + 1];
  //     capture.pixels[index + 2];
  //     capture.pixels[index + 3];
  //   }
  // }

  capture.updatePixels();
  image(capture, 0, 0)

  // const stepSize = round(constrain(mouseX / 8, 6, 32));
  // for (let y = 0; y < height; y += stepSize) {
  //   for (let x = 0; x < width; x += stepSize) {
  //     const i = y * width + x;
  //     const darkness = (255 - capture.pixels[i * 4]) / 255;
  //     const radius = stepSize * darkness;
  //     // let c = color(random(255), random(255), random(255))
  //     let c = color(0, 0, 0)
  //     fill(c)
  //     rect(x, y, radius, radius);
  //   }
  // }
  // //   filter(THRESHOLD)
}

function mouseClicked() {

  capture.loadPixels();
  console.log(tmpIndex);

  if (changeStage == 0) {
    changeStage = 1;
  } else if (changeStage == 1) {
    changeStage = 2;
  } else {
    changeStage = 0;
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
}

function edgeDetection(i, x, y) {

  let index0 = ((oldData[i][0] + x) + (oldData[i][1] + y) * width) * 4;
  let index1 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y - 1) * width) * 4;
  let index2 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y) * width) * 4;
  let index3 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y + 1) * width) * 4;
  let index4 = ((oldData[i][0] + x) + (oldData[i][1] + y - 1) * width) * 4;
  let index5 = ((oldData[i][0] + x) + (oldData[i][1] + y + 1) * width) * 4;
  let index6 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y - 1) * width) * 4;
  let index7 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y) * width) * 4;
  let index8 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y + 1) * width) * 4;
  let a;

  a = 0 + (capture.pixels[index0] + capture.pixels[index0 + 1] + capture.pixels[index0 + 2]) / 3 * (8);
  a = a - (capture.pixels[index1] + capture.pixels[index1 + 1] + capture.pixels[index1 + 2]) / 3;
  a = a - (capture.pixels[index2] + capture.pixels[index2 + 1] + capture.pixels[index2 + 2]) / 3;
  a = a - (capture.pixels[index3] + capture.pixels[index3 + 1] + capture.pixels[index3 + 2]) / 3;
  a = a - (capture.pixels[index4] + capture.pixels[index4 + 1] + capture.pixels[index4 + 2]) / 3;
  a = a - (capture.pixels[index5] + capture.pixels[index5 + 1] + capture.pixels[index5 + 2]) / 3;
  a = a - (capture.pixels[index6] + capture.pixels[index6 + 1] + capture.pixels[index6 + 2]) / 3;
  a = a - (capture.pixels[index7] + capture.pixels[index7 + 1] + capture.pixels[index7 + 2]) / 3;
  a = a - (capture.pixels[index8] + capture.pixels[index8 + 1] + capture.pixels[index8 + 2]) / 3;

  return a;
}

function edgeDetection2(i, x, y) {

  let index0 = ((oldData[i][0] + x) + (oldData[i][1] + y) * width) * 4;
  let index1 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y - 1) * width) * 4;
  let index2 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y) * width) * 4;
  let index3 = ((oldData[i][0] + x - 1) + (oldData[i][1] + y + 1) * width) * 4;
  let index4 = ((oldData[i][0] + x) + (oldData[i][1] + y - 1) * width) * 4;
  let index5 = ((oldData[i][0] + x) + (oldData[i][1] + y + 1) * width) * 4;
  let index6 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y - 1) * width) * 4;
  let index7 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y) * width) * 4;
  let index8 = ((oldData[i][0] + x + 1) + (oldData[i][1] + y + 1) * width) * 4;
  let a;

  a = 0 + (tmpData[index0] + tmpData[index0 + 1] + tmpData[index0 + 2]) / 3 * (8);
  a = a - (tmpData[index1] + tmpData[index1 + 1] + tmpData[index1 + 2]) / 3;
  a = a - (tmpData[index2] + tmpData[index2 + 1] + tmpData[index2 + 2]) / 3;
  a = a - (tmpData[index3] + tmpData[index3 + 1] + tmpData[index3 + 2]) / 3;
  a = a - (tmpData[index4] + tmpData[index4 + 1] + tmpData[index4 + 2]) / 3;
  a = a - (tmpData[index5] + tmpData[index5 + 1] + tmpData[index5 + 2]) / 3;
  a = a - (tmpData[index6] + tmpData[index6 + 1] + tmpData[index6 + 2]) / 3;
  a = a - (tmpData[index7] + tmpData[index7 + 1] + tmpData[index7 + 2]) / 3;
  a = a - (tmpData[index8] + tmpData[index8 + 1] + tmpData[index8 + 2]) / 3;

  return a;
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
  newData[1] = [0, 120, 120, 280];
  oldData[1] = [320, 180, 120, 280];
  // // C
  newData[2] = [120, 120, 80, 280];
  oldData[2] = [200, 120, 80, 280];
  // //D
  newData[3] = [200, 120, 160, 280];
  oldData[3] = [200, 120, 160, 280];
  // //E
  newData[4] = [360, 120, 80, 280];
  oldData[4] = [360, 180, 80, 280];
  //F
  newData[5] = [440, 120, 160, 280];
  oldData[5] = [440, 120, 160, 280];
  // //G
  newData[6] = [600, 120, 40, 280];
  oldData[6] = [400, 120, 40, 280];
  // //H
  newData[7] = [0, 400, 140, 80];
  oldData[7] = [140, 400, 140, 80];
  // //I
  newData[8] = [140, 400, 80, 80];
  oldData[8] = [280, 0, 100, 80];
  // //J
  newData[9] = [220, 400, 80, 80];
  oldData[9] = [480, 180, 80, 80];
  //K
  newData[10] = [300, 400, 140, 80];
  oldData[10] = [500, 0, 140, 80];
  //L
  newData[11] = [440, 400, 40, 80];
  oldData[11] = [380, 0, 40, 80];
  //M
  newData[12] = [480, 400, 160, 80];
  oldData[12] = [480, 260, 60, 80];
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
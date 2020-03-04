let w = 1280;
let h = 720;

let kinectron;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent("#sketch");
    background(0);
    kinectron = new Kinectron("192.168.0.24");
    // Connect with application over peer
    kinectron.makeConnection();

    // Set callbacks
    kinectron.setColorCallback(drawFeed);
    kinectron.setDepthCallback(drawFeed);
    kinectron.setInfraredCallback(drawFeed);
}

function draw() {
  var fps = frameRate();
  fill(0);
  stroke(0);
  text("FPS: " + fps.toFixed(0), 10, height);
  frameP.html(fps.toFixed(0));
}

// Choose camera to start based on key pressed
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.startColor();
  } else if (keyCode === UP_ARROW) {
    kinectron.startDepth();
  } else if (keyCode === DOWN_ARROW) {
    kinectron.startInfrared();
  } else if (keyCode === RIGHT_ARROW) {
    kinectron.stopAll();
  }
}

function drawFeed(img) {
  // Draws feed using p5 load and display image functions  
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 0);
  });

}

function draw() {
}
function drawBody(body) {
    background(0);
    for(let i = 0; i < body.joints.length; i++) {
        fill(255, 0, 0);
        ellipse(body.joints[i].depthX*width, body.joints[i].depthY*height, 20, 20);
    }
}
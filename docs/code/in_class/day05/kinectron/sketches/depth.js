let title = document.getElementById("page-title");
title.innerHTML = "Kinectron: Depth"

let w = 1280;
let h = 720;
//let depthImage;


let kinectron;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent("#sketch");
    background(0);
    kinectron = new Kinectron("192.168.0.24");
    
    kinectron.makeConnection();
    //kinectron.setRawDepthCallback(drawFeed);
    kinectron.startDepth(drawFeed);
    console.log(kinectron);
    // kinectron.setDepthCallback(drawFeed);
}

function draw() {
    //background(0);
    
}


function drawFeed(img) {
    
    // Draws feed using p5 load and display image functions  
    loadImage(img.src, function(loadedImage) {
        //background(255);
         

        //  loadedImage.loadPixels();

        //  let pixels = loadedImage.pixels;

        //  for(let i = 0; i < pixels.length; i+=4){
        //      pixels[i]*=2;
        //     //  pixels[i+1]-=255;
        //     //  pixels[i+2]-=255;
        //  }
        //  loadedImage.updatePixels();
         

         image(loadedImage, 0, 0);
         fill(255);
         text(frameRate(), 10, 10);
    });
}
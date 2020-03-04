let title = document.getElementById("page-title");
title.innerHTML = "Kinectron: Raw Depth"

let w = 1280;
let h = 720;
let depthBuffer;
let busy = false;


let kinectron;

function setup() {
    let canvas = createCanvas(w, h);
    canvas.parent("#sketch");
    background(0);
    kinectron = new Kinectron("192.168.0.24");
    
    kinectron.makeConnection();
   
    kinectron.startRawDepth(getData);
    console.log(kinectron);
}

function draw() {
    //background(0);
    
}

function getData(depthImage) {
    // print(depthImage);
  }
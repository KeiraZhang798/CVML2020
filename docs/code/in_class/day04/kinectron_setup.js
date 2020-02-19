
let w=640;
let h=480;

let kinectron;

function setup(){
let canvas=createCanvas(w,h);
canvas.parent("#sketch");
background(0);

kinectron=new Kinectron("10.75.26.216");

kinectron.makeConnection();

kinectron.startTrackedBodies(drawBody);

}

function draw(){



}

function drawBody(body){
    background(0);
    for(let i=0; i<body.joints.length; i++){

        fill(255,0,0);
        ellipse(body.joints[i].depthX*width,body.joints[i].depthY*height,20,20);
 
    }
}


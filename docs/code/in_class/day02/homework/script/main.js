let img;
let particles = [];
//let stepSize = 1;

function preload() {
  img = loadImage("images/334.jpg");
 // img = loadImage("/Users/ziyuzhang/Documents/GitHub/CVML2020/docs/images/333.jpg");
}


function setup() {
//   img.resize(displayWidth, displayHeight);
   createCanvas(displayWidth, displayHeight);
//img.resize(displayWidth/2, displayHeight/2);
  //createCanvas(1280, 720);
  
  background(255);
  //try to hide noStroke then you get a weird image
  noStroke();
  
    for(let i = 0; i < 400; i++) {
      let p = new Particle();
        
      p.size = 10;
      particles.push(p);
    }
      
}

function draw() {
  //background(0);
  
  // image(img, 0, 0);
  
  for(let i = 0; i < particles.length; i++) {
    
    let p = particles[i];
    
    let pColor = img.get(p.pos.x, p.pos.y);
    p.size = 10;
    
    p.color = pColor;
    p.draw();
    p.update();
    
  }
}


class Particle {
  
  constructor() {
    //position/velocity/accelerated velocity
    this.pos = createVector(random(width/6), random(height));
    this.vel = createVector(random(-5, 1), random(-3,0));
    this.acc = createVector(random(-12, 1), random(-.5, 1));
    
    this.color = [random(255), 255, 255];
    this.size = 10;
    this.age = 0;
  }
  
  update() {
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.checkWalls();
    
  }
  
  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  checkWalls() {
    
    // right edge
    if(this.pos.x > width-this.size/2) {
       
      this.pos.x = width-this.size/2;
      this.vel.x = -this.vel.x;
     }
     // bottom edge
    if(this.pos.y > height-this.size/2) {
       
       this.pos.y = height-this.size/2;
       this.vel.y = -this.vel.y;
      }
    
    // left edge
    if(this.pos.x < this.size/2) {
       
       this.pos.x = this.size/2;
       this.vel.x = -this.vel.x;
      }

      // top edge
    if(this.pos.y < this.size/2) {
       this.pos.y = this.size/2;
       this.vel.y = -this.vel.y;
      }
    
  }
    
    
    
  
  
  
}
  
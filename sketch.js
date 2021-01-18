const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var divisions = [];
var divisionHeight = 300;
var particles = [];
var plinkos = [];
var ground;
var particle;
var score = 0;
var count = 0;
var gameState = "PLAY"
function preload() {

}

function setup() {
  createCanvas(750, 700);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400, 690, 800, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }
  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }
  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }
  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }

  Engine.run(engine);
}

function draw() {
  rectMode(CENTER)
  background("black");
  textSize(40)
  text("Score:" + score, 10, 40)
  textSize(40)
  text("500", 10, 450)
  text("500", 90, 450)
  text("500", 170, 450)
  text("100", 246, 450)
  text("100", 326, 450)
  text("100", 406, 450)
  text("200", 486, 450)
  text("200", 566, 450)
  text("200", 646, 450)
  Engine.update(engine);
  //strokeWeight(4)
  ground.display();

   //***** Changed "END" to "end" ******
  if (gameState == "end") {
    background("black")
    fill("red")
    textSize(100)
    text("Game Over", 200, 400)
  }

  for (var n = 0; n < divisions.length; n++) {
    divisions[n].display();
  }

   //***** Commented this since we are going to generate particles on mouse click ******

  /* if(frameCount %60 === 0)
   {
     particles.push(new Particles(random(width/2-30, width/2+30), 10,10));
   }
    for(var h = 0; h<particles.length; h++)
    {
      particles[h].display();
    }*/
  for (var j = 0; j < plinkos.length; j++) {
    plinkos[j].display();
  }

//***** If condition used to find the bucket and increment score correctly ******
  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 660) {
      if (particle.body.position.x < 235) {
        score = score + 500;
        particle = null;
      }


      else if (particle.body.position.x < 475 && particle.body.position.x > 236) {
        score = score + 100;
        particle = null;

      }
      else if (particle.body.position.x < 700 && particle.body.position.x > 475) {
        score = score + 200;
        particle = null;

      }

    }

  }
  //***** Used to find the positions for if condition ******
console.log(mouseX + " "+ mouseY); 
}



 //***** Used to create particles on mouse click ******
function mousePressed() {
  if (gameState !== "end") {
    particle = new Particles(mouseX, 10, 10, 10)
  }
}





var plant, rand;
var plant1img, plant2img, plant3img, plant4img, plant5img, plant6img;
var boy, boyimg, spade, spadeimg;
var start, startimg, restart, restartimg;
var gold, goldimg, dimands, dimandsimg;

var gameState = "serve";
var serve, end, play;
var life, lifeimg;
var score, lives;
var Pop;

var plantgroup, goldgroup, dimandsgroup;

function preload(){
  bg = loadImage("image/bg.jpg");

  boyimg = loadImage("image/boy.png")
  lifeimg = loadImage("image/life.png")

  startimg = loadImage("image/start.png")
  restartimg = loadImage("image/restart.png")

  spadeimg = loadImage("image/spade.png")
  goldimg = loadImage("image/gold.png")
  dimandsimg = loadImage("image/dimands.jpeg")

  plant1img = loadImage("image/plant/plant1.png")
  plant2img = loadImage("image/plant/plant2.png")
  plant3img = loadImage("image/plant/plant3.png")
  plant4img = loadImage("image/plant/plant4.png")
  plant5img = loadImage("image/plant/plant5.png")
  plant6img = loadImage("image/plant/plant6.png")

  //Pop = loadSound("Audio/pop.mp3");
}

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);

  score = 0;
  lives = 3;

    // creating life image
    life = createSprite(40, 40);
    life.addImage(lifeimg);
    life.scale = 0.4;
  
    // creating UI sprites
    start = createSprite(width / 2, height / 2 + 100);
    start.addImage(startimg);
    start.scale = 0.7;
    start.visible = true;
  
    restart = createSprite(width / 2, height / 2 + 100);
    restart.addImage(restartimg);
    restart.scale = 0.7;
    restart.visible = false;

    boy = createSprite(width / 2, height / 1.1)
    boy.addImage(boyimg);
    boy.scale = 0.2;

    spade = createSprite(width / 2 , height / 1.5)
    spade.addImage(spadeimg);
    spade.scale = 0.2;

    plantgroup = new Group();
    goldgroup = new Group();
    dimandsgroup = new Group();

    // calling spawn tile function
   plantspawn();
}

function draw(){
  background(bg)
 
  if (gameState === "serve") {
   // UI changes
   start.visible = true;
   restart.visible = false;

   // start the game as soon as the mouse is pressed over start
   if (mousePressedOver(start) || touches.length > 0) {
     touches = [];
     gamestate = "play";
     spade.velocityX = -13;
     spade.velocityY = 14;
   }
 }

 if (gamestate = "play") {
  start.visible = true;
  restart.visible = false;

  // guiding the paddle x position to mouse x position
  boy.x = mouseX;

  // making bounceoff function for paddle and the edges
  if (spade.isTouching(boy)) {
    spade.y = spade.y - 2;
    spade.velocityY = -spade.velocityY;
  }

  if (spade.y <= 0) {
    spade.velocityY = -spade.velocityY;
  }

  if (spade.x <= 0) {
    spade.velocityX = -spade.velocityX;
  }

  if (spade.x >= windowWidth) {
    spade.velocityX = -spade.velocityX;
  }

  // breaking the tiles and increasing the score
  for (var i = 0; i < plantgroup.length; i++) {
    if (plantgroup.get(i) != null && spade.isTouching(plantgroup.get(i))) {
      plantgroup.get(i).destroy();
      spade.velocityY = -spade.velocityY;
      Pop.play();
      score += 10;
    }
  }

  // ending the game
  if (spade.y >= windowHeight + 5 && spade.y <= windowHeight + 20) {
    lives--;
    spade.x = width / 2;
    spade.y = height / 2;
    if (lives === 0) {
      gamestate = "end";
    }
  }
  for (var i = 0; i < plantgroup.length; i++) {
    if (plantgroup.get(i) != null && plantgroup.get(i).y >= windowHeight) {
      gamestate = "end";
      lives = 0;
    }
  }
     // calling the power-up functions
     goldpower();
     dimandspower();
     addplant();

 } else if (gamestate === "end") {
  reset();
}
  

 drawSprites();

   // displaing the score
   fill("white");
   textSize(32);
   text("Score: " + score, windowWidth - 300, 50);
   text(lives, 80, 50);

  }

function actualanim(){
  paddle.changeAnimation("normal", paddleanim);
}

function restart(){
  restart.visible = true;
  if (mousePressedOver(restart) || touches.length > 0) {
    touches = [];
    gamestate = "play";
    spade.x = width / 2;
    spade.y = height / 2;
    spade.velocityX = -15;
    spade.velocityY = 16;
    plantgroup.destroyEach();
    plantpawn();
    boy.changeAnimation("normal", padleanim);
    lives = 3;
    score = 0;
  }
}

function plantspawn() {
  for (var x = 52.5; x < windowWidth; x = x + windowWidth / 13) {
    for (var y = 100; y <= 250; y = y + 50) {
      plant = createSprite(x, y);
      plant.scale = 0.25;
      plantgroup.add(plant);
      rand = Math.round(random(1, 10));
      switch (rand) {
        case 1:
          plant.addImage(plant1img);
          break;
        case 2:
          plant.addImage(plant2img);
          break;
        case 3:
          plant.addImage(plant3img);
          break;
        case 4:
          plant.addImage(plant4img);
          break;
        case 5:
          plant.addImage(plant5img);
          break;
        case 6:
          plant.addImage(plant6img);
          break;
        default:
          break;
      }
    }
  }
}

function addplant() {
  for (var i = 0; i < plantgroup.length; i++) {
    if (plantgroup.get(i) != null && frameCount % 250 === 0) {
      plantgroup.get(i).y = plantgroup.get(i).y + 50;
    }
  }
  if (frameCount % 250 === 0) {
    for (var x = 52.5; x < windowWidth; x = x + windowWidth / 13) {
      plant = createSprite(x, 100);
      plant.scale = 0.25;
      plantgroup.add(plant);
      rand = Math.round(random(1, 10));
      switch (rand) {
        case 1:
          plant.addImage(plant1img);
          break;
        case 2:
          plant.addImage(plant2img);
          break;
        case 3:
          plant.addImage(plant3img);
          break;
        case 4:
          plant.addImage(plant4img);
          break;
        case 5:
          plant.addImage(plant5img);
          break;
        case 6:
          plant.addImage(plant6img);
          break;
        default:
          break;
      }
    }
  }
}

function mouseDragged() {
  boy.x = mouseX;
}

function goldpower() {
  if (frameCount % 350 === 0) {
    rand = Math.round(random(10, windowWidth - 10));
    goldpower = createSprite(rand, 0);
    goldpower.addImage(bulletPowerImg);
    goldpower.scale = 0.2;
    goldpower.velocityY += 6;
  }
}

function dimandspower() {
  if (frameCount % 250 === 0) {
    rand = Math.round(random(10, windowWidth - 10));
    dimandspower = createSprite(rand, 0);
    dimandspower.addImage(extendPowerImg);
    dimandspower.scale = 0.2;
    dimandspower.velocityY += 6;
  }
}

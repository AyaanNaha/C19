var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  


  spookySound.loop();
}

function draw() {
  background(0);
  

  if(gameState === "play") {

    if(tower.y > 400){
        tower.y = 300
      }

    ghost.velocityY += 0.5;

    if(keyDown("SPACE")) {
      ghost.velocityY = -10;
    }

    if(keyDown("LEFT_ARROW")) {
      ghost.x -=3;
    }

    if(keyDown("RIGHT_ARROW")) {
      ghost.x +=3;
    }

    if(frameCount%250 == 0) {
      createDoor();
    }

    ghost.collide(climbersGroup);

    if(ghost.y > 630 || invisibleBlockGroup.isTouching(ghost) || ghost.y < -30) {
      gameState = "end";
    }

  } else if(gameState === "end") {
    tower.visible = false;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    ghost.destroy();

    fill(255);
    textSize(50);
    text("GAME OVER",100,300);
    
  }

  drawSprites();
}

function createDoor() {

  var randX = Math.round(random(100,500));
  
  door = createSprite(randX,-80);
  door.addImage("door", doorImg);
  door.velocityY = 1;
  door.lifetime = 900;
  doorsGroup.add(door);
  door.depth = ghost.depth;
  

  climber = createSprite(randX,-10);
  climber.addImage("climber",climberImg);
  climber.velocityY = 1;
  climbersGroup.add(climber);
  climber.lifetime = 900;
  climber.depth = ghost.depth;
  climber.debug = true;

  invisibleBlock = createSprite(randX,5,100,2);
  invisibleBlock.velocityY = 1;
  invisibleBlock.setCollider("rectangle",0,0,100,2);
  invisibleBlock.debug = true; 
  invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.lifetime = 900;

  ghost.depth += 1;

}

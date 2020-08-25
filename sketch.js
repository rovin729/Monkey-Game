var player,monkeyImage,bananaImage,obstacleImage,bananaGroup,obstacleGroup,BGimage,BG,ground
var score=0

function preload() {
  BGimage = loadImage("jungle.jpg");
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage=loadImage("banana.png");
  
  obstacleImage=loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  BG=createSprite(200,200,400,400);
  BG.addImage(BGimage);
  BG.x = BG.width /2;
  
  ground=createSprite(200,380,400,5);
  ground.visible=false;
  
  player=createSprite(75,350);
  player.addAnimation("monkey",monkeyImage);
  player.scale=0.1;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background(220);
  BG.velocityX=-4;
  if(keyDown("space")&&player.y>317){
     player.velocityY=-12;
   }
  
  player.velocityY=player.velocityY+0.5;
  
   if(BG.x<0){
     BG.x=BG.width/2;
   }
  
  player.collide(ground);
  
  food();
  obstacles();
  
  if(player.isTouching(bananaGroup)){
     score=score+2
     bananaGroup.destroyEach();
     }
  
  switch(score){
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    case 50: player.scale=0.2;
      break;
    default: break;
  }
  
  if(player.isTouching(obstacleGroup)){
   player.scale=0.1;
   score=0 
  }
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,250,50);
}
function food() {
  
  if(World.frameCount%100===0){
    var banana = createSprite(400, 200);
    banana.scale=0.05;
    var range=Math.round(random(220,300));
    banana.y=range;
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.lifetime=110;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if(World.frameCount%300===0){
    var stone = createSprite(400,350);
    stone.addImage(obstacleImage);
    stone.scale=0.15;
    stone.velocityX=-4;
    stone.lifetime=110;
    stone.setCollider("circle",0,0,50)
    obstacleGroup.add(stone);
  }
}
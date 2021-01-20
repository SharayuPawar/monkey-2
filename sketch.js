
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup;
var obstacleGroup;
var score;
var survivalTime=0;
var ground;
var gameState='PLAY';
var END=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500);

  monkey=createSprite(90,365,20,29);
  monkey.addAnimation('moving',monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(600,400,900,10);
  ground.velocityX=-12;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = new Group();
  bananaGroup= new Group();
  gameState='PLAY';
}



function draw() {
background('lightblue');
  
 if (ground.x < 500) {
    ground.x = ground.width / 2;
  }
  monkey.collide(ground);

  if (gameState === "PLAY") {
       
 if(keyDown("space")){
   monkey.velocityY = -10;
  }
     monkey .collide(ground);
    monkey.velocityY = monkey.velocityY + 0.5;
  
  spawnbanana();
  spawnobstacle();
    
  

  
   survivalTime = Math.ceil(frameCount / frameRate())
    if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
      
  }
   
  }
   
   if (obstacleGroup.isTouching(monkey)) {

    gameState = "END"

  } else if (gameState === "END") {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    stroke("blue");
    textSize(50);
    fill("red");
    text("GAME OVER ! !", 50, 200);
    
   
  }
  drawSprites(); 

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100, 50);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
    
}


function spawnbanana() {
 
   if (frameCount % 100 === 0) {
     banana = createSprite(400,1,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
     monkey.depth = banana.depth + 1;
     bananaGroup.add(banana)
    bananaGroup.setlifetimeEach = 150;
     
    }
}
function spawnobstacle(){
  if(frameCount%300===0){
     var obstacle = createSprite(300,365,23,32);
     obstacle.velocityX=-3;
     obstacle.addImage('obstacle',obstacleImage);
     obstacle.scale=0.2; 
    obstacleGroup.add(obstacle);
    obstacleGroup.setlifetimeEach=100;
  
   
     }
  
}

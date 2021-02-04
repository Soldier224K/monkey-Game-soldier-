
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var PLAY = 1;
var END = 0;
var gameState=PLAY
var ground,groundImage

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImage=loadImage("king.jpg")
  groundImg=loadAnimation("ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png","ground.png")
}



function setup() {
  createCanvas(600,200)
monkey=createSprite(100,150,10,10);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale=0.1
  
  ground = createSprite(600,190,1200,20);
  
  //creating invisible ground
  invisibleGround = createSprite(200,168 ,400,10);
  invisibleGround.visible = false;
  
  
 obstaclesGroup = createGroup();
  foodGroup=createGroup();
  ground.velocityX=-1
}


function draw() {
  background(backgroundImage)
  if(gameState===PLAY){
    monkey.setCollider("circle",0,0,120)
//monkey.debug=true
  if(ground.x<0){
     ground.x = ground.width /2;
  }
    
  if(keyDown("up")&& monkey.y>=120){
    monkey.velocityY=-10
  }
    
    monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(invisibleGround);
    
    text("Score: "+ score, 500,50);
    
    
  monkey.collide(ground)
  spawnfood();
  spawnObstacles();
    monkey.visible=true 
    
    
  }
  if(gameState===END){
    ground.velocityX=0
    obstaclesGroup.destroyEach()
    foodGroup.destroyEach()
    monkey.destroy()
    score=0
  }
  
drawSprites();
   
  if(obstaclesGroup.isTouching(monkey)){
  gameState=END
  
  }
  if(keyDown("space")){
    gameState=PLAY 
  }
  if(foodGroup.isTouching(monkey)){
    score=2
    
    
  }
  
  
}
function spawnObstacles(){
 if (frameCount % 100=== 0){
   var obstacle = createSprite(1200,165,10,40);
   
    //generate random obstacles
    obstacle.x = Math.round(random(500,1200));
    obstacle.addImage(obstacleImage);
      

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 1200;
   obstacle.velocityX=-3
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnfood(){
   if (frameCount % 100=== 0) {
    var banana= createSprite(600,120,40,10);
    banana.y = Math.round(random(60,90));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
     foodGroup.add(banana)
   }
}
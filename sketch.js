var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var gameOver, restart;
var player
var playerAnimation = []
var playerSpriteData,playerSpriteSheet
var i
var Img, bground,bground2
var x1 = 0; 
var x2
var scrollSpeed = 10
var Iground
var fire, fireImg
var walking,jumping,falling;
var fireGroup;
var restartButton, overbutton
var wood, woodImg, woodGroup

function preload(){
 
  walking = loadAnimation("walking animation/1.png","walking animation/2.png","walking animation/3.png",
  "walking animation/4.png","walking animation/5.png","walking animation/6.png")
  bground = loadImage("Assets/Bground.jpg")
  bground2 = loadImage("Assets/Bground(2).jpg")
 fireImg = loadAnimation("fire animation/1.jpg","fire animation/2.jpg","fire animation/3.jpg",
  "fire animation/4.jpg","fire animation/5.jpg","fire animation/6.jpg","fire animation/7.jpg");
  jumping = loadAnimation("jumping animation/1.png","jumping animation/2.png","jumping animation/3.png")
  falling = loadAnimation("falling animation/1.png","falling animation/2.png","falling animation/3.png",
  "falling animation/4.png","falling animation/5.png","falling animation/6.png")
  gameOver = loadImage("game end/gameover.png")
  restart = loadImage("game end/restart.png")
  woodImg = loadImage("wood animation/wood.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight)
   player = createSprite(100,height/2+170,30,30)
   player.addAnimation("walking",walking)
   player.scale = 3
   Iground = createSprite(width/2,height-25,width,20)
   Iground.visible = false
   x2 = width
   fireGroup = new Group();
   woodGroup = new Group()
   restartButton = createSprite(width/2,height/2)
   restartButton.addImage(restart)
   restartButton.scale = 0.5
   overbutton = createSprite(width/2,500)
   overbutton.addImage(gameOver)
   
}

function draw() {
  
  background("white")
 

   if(gameState === PLAY){
    image(bground, x1, 0, width, height); 
    image(bground2, x2, 0, width, height);
     x1-=scrollSpeed; 
     x2-=scrollSpeed;
     
    restartButton.visible = false
    overbutton.visible = false

    if(x1<= -width)
    
    { x1 = width; } 

    if(x2<=-width)
    
    { x2=width; 
    }

    player.visible=true;

    if(keyDown("up")&&player.y >= height/2){
      player.velocityY = -10
      player.addAnimation("jumping",jumping)
    }
   
    player.velocityY = player.velocityY + 0.8
    
    
    player.collide(Iground)
    
    spawnFire();
    spawnWood();
  
    if(player.isTouching(fireGroup)){
       gameState = END;
   }
   if(player.isTouching(woodGroup)){
    gameState = END;
}

  }
  else if(gameState === END){

    background("black");
 
  restartButton.visible = true
  overbutton.visible = true
  player.addAnimation("falling",falling)
  player.velocityY = 0;
  
    fireGroup.destroyEach();
    woodGroup.destroyEach();
  
  if(mousePressedOver(restartButton)) {
    reset();
  }
  }
  drawSprites()
  }
  
function spawnFire(){
  if(frameCount % 150 === 0){
    fire = createSprite(width/2+200,100,20,20)
    fire.velocityX = -9.5
    fire.velocityY = 5
    fire.addAnimation("fire",fireImg)
    fireGroup.add(fire);
  }
}

function spawnWood(){
  if(frameCount % 250 === 0){
    wood=createSprite(width/2+250,600,20,20)
    wood.velocityX = -8.5
    wood.addImage(woodImg)
    wood.scale = 0.2
    woodGroup.add(wood);
    
  }
}

function reset(){
 gameState = PLAY
 
 
}
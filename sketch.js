var dog ,dogImage, happyDog;
var food, foodStock, foodS;
var database;
var feedDog, addFood;
var feed, addFoods
var fedTime, lastFed;
var feedTime;
var foodObj;

function preload(){
  dogImage=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
  deadDog=loadImage("images/deadDog.png");
  hall= loadImage("images/Living Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup(){

  foodObj = new Food();

  database = firebase.database();
  createCanvas(500,500);

  foodS = database.ref("foodStock");
  foodS.on("value",readStock);

  dog = createSprite(430,430,5,5);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  feed= createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(FeedDog);

  addFood= createButton("Add Food");
  addFood.position(700,115);
  addFood.mousePressed(addFoods);
  
  
  
}

function draw(){
  background(hall);
  text("dog is healthy, good work!!",50,50)
  console.log(frameCount);
  
  if(foodS!==undefined){
    feedTime=database.ref("FeedTime");
    feedTime.on("value",function(data){
      feedTime=data.val();
    })

  if(frameCount>=100&&frameCount<=500){
    fill("white");
    stroke("black");
    text("dog is hungry, feed him!!",200,200);
    background(garden);
  }
  
  if(frameCount>=501&&frameCount<=1000){
    text("dog is getting sick, feed him fast!!",50,50)
    background(washroom);
  }

  if(frameCount>=1001){
    background(0,0,0);
    drawSprites();
    dog.addImage(deadDog);
    text("you lost the game. your dog is dead reload the page to restart",150,200)
  }
 
}

 
  
  fill("black");
  text("food stock: "+foodS,200,20);

  foodObj.display();
  }


function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x<= 0){
    x=0;
  }

  else{
    x = x-1;
  }

 
    database.ref('/').update({
      food:x
    });
 
}


function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS
  })

  foodObj.updateFoodStock(foodObj.getFoodStock());
    database.ref('/').update({
      Food:foodObj.getFoodStock()
    })
}

function FeedDog(Food){
    dog.addImage(happyDog);
    /*
    foodObj.updateFoodStock(foodObj.deductFoodStock);
    */ 

   foodS--;
   foodObj.foodStock = foodS;
   frameCount= frameCount-100;

}


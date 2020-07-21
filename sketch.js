//Create variables here
var dog, happyDog, database, foodS, foodStock;
var milkImg, getFoodStock,updateFoodStock,DeductFoodStock;
var feed,feedDog,addFood,addFoods,fedTime,lastFed;
var foodObj;
function preload()
{

  happyimage = loadImage("dogImg1.png");
  dogimage = loadImage("dogImg.png");
  
	//load images here
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock= database.ref('food');
  foodStock.on("value",readStock);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogimage);
  dog.scale=0.5

  feed=createButton("Feed SPIKE");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
writeStock(foodS);

dog.addImage(happyimage);
}

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last feed :"+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed :" + lastFed + "AM" , 350,30);
}

fedTime=database.ref('Feedtime');
fedTime.on("value",function(data){

lastFed=data.val();

})

  drawSprites();
  //add styles here

}


function readStock(data){
  foodS=data.val();

}

function writeStock(x){

if(x<=0){
  x=0;
}else{
  x=x-1
}

database.ref('/').update({
food:x

})

}

function feedDog(){
  dog.addImage(happyimage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
food:foodObj.getFoodStock(),
fedTime:hour()
})
}

function addFoods(){
foodS++;
database.ref('/').update({
food:foodS
})

}
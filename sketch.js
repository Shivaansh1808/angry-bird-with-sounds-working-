const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Events = Matter.Events;

var engine, world;

var backgroundImg,platform;
var birds = [];

var flying;
var select;
var snort;



var gameState = "onsling";

var score = 0;

function preload() {

    getBackgroundImage();

    flying = loadSound("sounds/bird_flying.mp3");
    select = loadSound("sounds/bird_select.mp3");
    snort = loadSound("sounds/pig_snort.mp3");

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,60);
    bird2 = new Bird(150, 170);
    bird3 = new Bird(100, 170);
    bird4 = new Bird(50, 170);

    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingShot = new SlingShot(bird.body,{x:200, y:100});
}

function draw(){

    if(backgroundImg)

    background(backgroundImg);

    textSize(30);
    fill("white");
    text("Score: " + score, width-200, 100);

    Engine.update(engine);
    strokeWeight(4);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();

    pig1.score();

    log1.display();

    box3.display();
    box4.display();
    pig3.display();

    pig3.score();

    log3.display();

    box5.display();
    log4.display();
    log5.display();

    slingShot.beforeBird();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingShot.afterBird();
}

function mouseDragged(){
    //if(gameState === "onsling"){
    Events.on(engine, 'afterUpdate', function(){
        Matter.Body.setPosition(birds[birds.length - 1].body, {x:mouseX, y:mouseY} );
    }) 
 // }
}

function mouseReleased(){
    engine.events = {}
    slingShot.fly();
    birds.pop();
    gameState = "launched";
    bird.visibility = 255;
    flying.play();
}

function keyPressed(){
    if(birds.length > 0){
    if(keyCode === 32){
        Matter.Body.setPosition(birds[birds.length - 1].body, {x: 200, y: 50});
        slingShot.attach(birds[birds.length - 1].body);
        bird.trajectory = [];
        select.play();
    }
}
}

async function getBackgroundImage(){

    var response = await fetch("http://worldclockapi.com/api/json/est/now");
    var responseJSON = await response.json();
    var dateTime = responseJSON.currentDateTime;
    var hour = dateTime.slice(11,13);

    if(hour > 06 && hour < 19){
        bg = "sprites/bg.pngs";
    }else{

    bg = "sprites/bg2.jpg";

}
    backgroundImg = loadImage(bg);
}
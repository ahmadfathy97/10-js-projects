let slctElem = selector => document.querySelector(selector);
let slctElems = selector => document.querySelectorAll(selector);
let spaceship,
    meteor,
    meteors = [],
    lasershoot,
    lasershoots = [],
    canW,
    canH,
    started = false,
    score = 0,
    gameover = false;

let meteorImg, explosion, spaceshipImg;
function preload() {
  meteorImg = loadImage('../assets/meteor.png');
  spaceshipImg = loadImage('../assets/spaceship.png');
  explosion = loadSound('../assets/Explosion.mp3');
}

let startContainer = slctElem('#start-container'),
    startBtn = slctElem('#start'),

    helpContainer = slctElem('#help-container'),
    helpBtns = slctElems('.help-btn'),
    closeHelp = slctElem('#close-help'),

    scoreElem = slctElem('#score'),

    gameOverElem = slctElem('#game-over-container'),
    resetBtn = slctElem('#reset'),
    finalScoreElem = slctElem('#final-score');


function startGame(){
  started = true;
  loop();
  startContainer.style.display = "none";
  gameOverElem.style.display = "none";
}
startBtn.addEventListener('click', ()=>{
  startGame();
});

resetBtn.addEventListener('click', ()=>{
  resetGame();
  startGame();
});

closeHelp.addEventListener('click', ()=>{
  helpContainer.style.display = "none";
})
helpBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    helpContainer.style.display = "flex";
  });
});


function setup() {
  createCanvas(innerWidth-20 , innerHeight-20);
  canH = height;
  canW = width;
  spaceship = new Spaceship((canW/2 - 40), (canH - 90) , 80, 80, spaceshipImg);
  createMeteors();
}
function createMeteors(){
  for (i=0; i<Math.floor(canW/80);i++){
    let x= random(40, canW-40);
    meteor = new Meteor(x, -150, canW*.05, canW*.05, meteorImg, random(.5, 3));
    meteors.push(meteor);
  }
}
function resetGame(){
  gameover = false;
  clear();
  meteors = [];
  lasershoots = [];
  spaceship = new Spaceship((canW/2 - 40), (canH - 90) , 80, 80, spaceshipImg);
  createMeteors();
}

setInterval((x)=>{
  if(window.focused && !gameover){
    createMeteors();
  }
}, 3000);

function keyPressed() {
  if(keyCode === CONTROL){
    lasershoot = new LaserShoot(spaceship.x + (spaceship.w/2), spaceship.y, 5, 10);
    lasershoots.push(lasershoot);
  }
}

function draw() {
  clear();
  if(!started){
    noLoop();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spaceship.setXAndY(8, 0);
  }
  if (keyIsDown(LEFT_ARROW)) {
    spaceship.setXAndY(-8, 0);
  }
  if (keyIsDown(UP_ARROW)) {
    spaceship.setXAndY(0, -8);
  }
  if (keyIsDown(DOWN_ARROW)) {
    spaceship.setXAndY(0, 8);
  }
  scoreElem.textContent = score;
  lasershoots.forEach((laser, i) => {
    laser.show();
    laser.move();
    if(laser.y <= 0){
      lasershoots.splice(i, 1);
    }
    let meteorDestroyed = laser.destroyMeteor(meteors);
    if(meteorDestroyed.destroyed){
      // noLoop();
      meteors.splice(meteorDestroyed.meteor, 1);
      lasershoots.splice(i, 1);
      explosion.play();
      score += 5;
    }
  });
  meteors.forEach((meteor, i) => {
    meteor.show();
    meteor.move();
    if(meteor.y >= canH){
      meteors.splice(i, 1);
    }
    if(meteor.destroyed(spaceship)){
      clear();
      gameOverElem.style.display = "flex";
      finalScoreElem.textContent = score;
      score = 0;
      started = false;
      gameover = true;
      noLoop();
    }
  });

  spaceship.show();
  spaceship.move(canW, canH);
}

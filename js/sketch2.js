import { gameObject } from "./classes/gameObject.js";
import { Pacman } from "./classes/pacman.js";
import { Food } from "./classes/food.js";
import { configGame} from "./constants.js";
import {ErrorPac} from "./classes/errorPac.js";
import {Powup} from "./classes/powup.js";

let imgRock;
let numberImagesLoaded = 0;

const arrRocks = [];

let imgFood;
const arrFood = [];

let imgPacmanLeft;
let imgPacmanRight, imgPacmanUp, imgPacmanDown, imgPacman;
let myPacman;
let wakaSound;
let timer = 0;
let startTimeGame = 0;
let imgPowerUp;
const arrPowerUp = [];

function preload() {
  imgRock = loadImage("../media/paret.png", handleImage, handleError);
  imgFood = loadImage("../media/zombie.png", handleImage, handleError);
  imgPacman = loadImage("../media/dreta.png", handleImage, handleError);
  imgPacmanRight = loadImage("../media/dreta.png", handleImage, handleError);
  imgPacmanUp = loadImage("../media/amunt.png", handleImage, handleError);
  imgPacmanLeft = loadImage("../media/esquerra.png", handleImage, handleError);
  imgPacmanDown = loadImage("../media/abaix.png", handleImage, handleError);
  imgPowerUp = loadImage("../media/dracula.png", handleImage, handleError);


  wakaSound = loadSound("../media/audio/WakaWaka.mp3", handleSound, handleErrorSound);
}

function handleSound() {
  console.error("S'ha carregat correctament l'audio");
}
function handleErrorSound() {
  console.error("Error carregar audio");
  numberErrorLoadedSounds++;
}
  function handleError() {
  console.error("Error carregar alguna imatge");
  try {
    throw new ErrorPac(20, "Falta imatge per carregar");
  } catch (error) {
    console.error("Error carregar alguna imatge");
    showError();
  }
}

function handleImage() {
  console.error("Images carregada correctament");
  numberImagesLoaded++;
}

function setup() {
  createCanvas(configGame.WIDTH_CANVAS, configGame.HEIGHT_CANVAS + configGame.EXTRA_SIZE_HEIGHT).parent("sketch-pacman");
  for (let filaActual = 0; filaActual < configGame.ROWS; filaActual++) {
    for (let columnaActual = 0; columnaActual < configGame.COLUMNS; columnaActual++) {
      if (configGame.map[filaActual][columnaActual] === 1) {
        const roca = new gameObject(filaActual, columnaActual);
        arrRocks.push(roca);
      }
      else if (configGame.map[filaActual][columnaActual] === 2) {
        const food = new Food(filaActual, columnaActual);
        arrFood.push(food);
      }
      else if (configGame.map[filaActual][columnaActual] === 3) {
        myPacman = new Pacman(filaActual, columnaActual);
      }
      else if (configGame.map[filaActual][columnaActual] === 5) {
        const powerUp = new Powup(filaActual, columnaActual);
        arrPowerUp.push(powerUp);
      }
    } 
  } 
  console.log("array rocks size: ", arrRocks.length);
  console.log("array foods size: ", arrFood.length);
  startTimeGame = millis();
}

function draw() {
  background(171, 248, 168);

  // Draw rocks
  for (let i = 0; i < arrRocks.length; i++) {
    arrRocks[i].showObject(imgRock);
  }

  // Draw power-ups
  for (let i = 0; i < arrPowerUp.length; i++) {
    arrPowerUp[i].showObject(imgPowerUp);
  }

  // Draw food
  for (let i = 0; i < arrFood.length; i++) {
    arrFood[i].showObject(imgFood);
  }

  // Check for collisions with rocks (no reset for now)
  for (let i = 0; i < arrRocks.length; i++) {
    myPacman.testCollideRock(arrRocks[i]);  // This should now do nothing on collision
  }

  // Check for collisions with food (instant death)
  for (let i = 0; i < arrFood.length; i++) {
    let resultTest = myPacman.testCollideFood(arrFood[i]);
    if (resultTest) {
      // Pacman hits food, instant game over
      alert("Game Over! You hit a zombie item!");
      restartGame();  // Call a function to restart the game
      break;  // Stop further checks
    }
  }

  for (let i = 0; i < arrPowerUp.length; i++) {
    let resultTest = myPacman.testCollidePowerup(arrPowerUp[i]);
    if (resultTest) {
      // Pacman hits food, instant game over
      alert("Game Over! Dracula killed you!");
      restartGame();  // Call a function to restart the game
      break;  // Stop further checks
    }
  }

    for (let i = 0; i < arrFood.length; i++) {
    let resultTest = myPacman.testCollideFood(arrFood[i]);
    if (resultTest) {
      // Pacman hits food, instant game over
      alert("Game Over! You hit a zombie item!");
      restartGame();  // Call a function to restart the game
      break;  // Stop further checks
    }
  }

  // Draw score and timer
  textSize(20);
  textAlign(CENTER, CENTER);
  timer = parseInt(millis() - startTimeGame);
  text("Score: " + myPacman.scorePacman, 150, configGame.HEIGHT_CANVAS + 50);
  text("Time: " + timer, 150, configGame.HEIGHT_CANVAS + 100);

  // Draw Pacman with the correct direction
  switch(myPacman.directionPacman){
    case 1: myPacman.showObject(imgPacmanRight); break;
    case 2: myPacman.showObject(imgPacmanUp); break;
    case 3: myPacman.showObject(imgPacmanLeft); break;
    case 4: myPacman.showObject(imgPacmanDown); break;
    default: myPacman.showObject(imgPacman);
  }

  // Play waka sound
  if (!wakaSound.isPlaying()) {
    wakaSound.play();
  }

  // Handle power-ups and game logic
  testFinishPowerup();
  testFinishGame();
}

function restartGame() {
  // Reset the game state here
  myPacman = null;
  arrFood = [];
  arrRocks = [];
  arrPowerUp = [];

  // Reset the map and reload it
  setup();
  loop();  // Restart the game loop
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    myPacman.moveRight();
  } else if (keyCode === LEFT_ARROW) {
    myPacman.moveLeft();
  } else if (keyCode === UP_ARROW) {
    myPacman.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    myPacman.moveDown();
  } else {
    console.log("Error, invalid key");
    let error = new ErrorPac(101, "Press a valid key");
    error.toString();
  }
}

function showError(){
  let errorImage = new ErrorPac(105, "Error 2loading image");
  errorImage.toString();
  const parent = document.getElementById("error-holder");
  const node = document.createElement("media");
  node.setAttribute("src", "./media/tristesa.webp");
  node.setAttribute("alt", "Imatge Error");
  node.setAttribute("width", 300);
  node.setAttribute("height", 300);

  parent.appendChild(node);
  noLoop();
  remove();
}

function testFinishGame(){
 /*
  if (arrFood.length === 0){
    //Fi del joc
    noLoop();
    let theconfirm =confirm("Fi del joc, has guanyat. Desitja jugar una altra partida ?");
    loop`();`
    if( theconfirm)
    {
      restartGame();
    }
    else {
      alert("Gracies per jugar");
    }
    loop();
  }/*
  else if {
    //test if loose game
  }
  else {
    //continume
  }*/
}

function testFinishPowerup() {

  for (let i = 0; i < arrPowerUp.length; i++) {
    if (arrPowerUp[i].enabledPowerup === true) {
      console.log("Powerup activat numero " + i);
      console.log("Powerup activat startTime " + arrPowerUp[i].startTimePowerup);
      console.log("Powerup activat enabled " + arrPowerUp[i].enabledPowerup);
      
    }
  }
}

/*globalThis: globalThis object. This is done to ensure
that the p5.js library can call these functions when needed.
 */
globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed = keyPressed;



import {gameObject} from './gameObject.js';
import {configGame} from "../constants.js";

const { IMAGE_SIZE, WIDTH_CANVAS, SPEED_PACMAN } = configGame;

export class Pacman extends gameObject {

  constructor(row,column){
    super(row,column);
    this.directionPacman = 1; // 1 -> right, 2 -> up, 3 -> left, 4 -> down
    this.speedPacman = configGame.SPEED_PACMAN; //Image size
    this.scorePacman = 0;
    this.pacmanlives = configGame.LIVES_PACMAN;
  }

  moveRight(){
    let temp = this.coordXPixels + this.speedPacman;
    if (temp < 0 || temp > (WIDTH_CANVAS - IMAGE_SIZE)) {
      console.log("Error, no es pot moure a la dreta");
      return;
    }
    this.directionPacman = 1;
    this.coordXPixels = temp;
  }

  moveUp(){
    let temp = this.coordYPixels - this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure amunt");
      return;
    }
    this.directionPacman = 2;
    this.coordYPixels = temp;
  }

  moveDown(){
    let temp = this.coordYPixels + this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure avall");
      return;
    }
    this.directionPacman = 4;
    this.coordYPixels = temp;
  }

  moveLeft(){
    let temp = this.coordXPixels - this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure a l'esquerra");
      return;
    }
    this.directionPacman = 3;
    this.coordXPixels = temp;
  }

  testCollideRock(roca){
    let distancia = dist(this.coordXPixels, this.coordYPixels, roca.coordXPixels, roca.coordYPixels);

    if (distancia < IMAGE_SIZE) {
      switch (this.directionPacman) {
        case 1: // Right
          this.coordXPixels -= this.speedPacman;
          break;
        case 2: // Up
          this.coordYPixels += this.speedPacman;
          break;
        case 3: // Left
          this.coordXPixels += this.speedPacman;
          break;
        case 4: // Down
          this.coordYPixels -= this.speedPacman;
          break;
        default:
          console.log("Error, direcció no reconeguda");
      }
    }
  }

  testCollideFood(food) {
    let distancia = dist(this.coordXPixels, this.coordYPixels, food.coordXPixels, food.coordYPixels);

    if (distancia < IMAGE_SIZE) {
      console.log("Has agafat una food");
      return true;
    } else {
      console.log("Food massa lluny");
      return false;
    }
  }


  testCollidePowerup(powerup){
    let distancia = dist(this.coordXPixels, this.coordYPixels, powerup.coordXPixels, powerup.coordYPixels);

    if (distancia < IMAGE_SIZE) {
      console.log("Has agafat una powerup");
      this.endGame();
      return true;
    } else {
      console.log("Powerup massa lluny");
      return false;
    }
  }

  endGame() {
    console.log("Game Over");
    // Add any additional game over logic here
  }

  spawnPacman(){
    this.coordXPixels = 7 * 32;
    this.coordYPixels = 7 * 32;
  }
}

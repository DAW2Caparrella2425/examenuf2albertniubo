export const configGame = {
  ROWS: 10,
  IMAGE_SIZE: 32,
  COLUMNS: 10,
  EXTRA_SIZE_HEIGHT: 300,
  SPEED_PACMAN: 32,
  LIVES_PACMAN: 3,
  // 1 -> rock, 2 -> food, 3 -> pacman, 4 -> enemy, 5 -> powerup
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1], // Two food items at (1,1) and (1,7)
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 3, 1, 0, 1, 2, 0, 1], // Pacman is at (3,3)
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 5, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
};


// Calcular WIDTH_CANVAS
configGame.WIDTH_CANVAS = configGame.IMAGE_SIZE * configGame.COLUMNS;
configGame.HEIGHT_CANVAS = configGame.IMAGE_SIZE * configGame.ROWS;

console.log(configGame.WIDTH_CANVAS);
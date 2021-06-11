export class Sound {
  constructor() {}

  playerHitSound() {
    let sound = document.createElement("audio");
    sound.src = "../assets/paddle_hit.wav";
    sound.style.display = "none";
    sound.play();
  }

  terrainHitSound() {
    let sound = document.createElement("audio");
    sound.src = "../assets/terrain_hit.wav";
    sound.style.display = "none";
    sound.play();
  }

  scoreSound() {
    let sound = document.createElement("audio");
    sound.src = "../assets/score.wav";
    sound.style.display = "none";
    sound.play();
  }
}

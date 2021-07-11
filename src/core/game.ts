import { Ball } from "./ball";
import { Player } from "./player";
import {
  canvas,
  context,
  PLAYER_ONE_SCORE_X,
  PLAYER_SCORE_Y,
  PLAYER_TWO_SCORE_X,
} from "../constants/constants";
import { Collisions } from "../models/collisions";
import { Sound } from "../constants/sound";
import { GameObjects } from "../models/game-objects";
export class Game {
  constructor(
    private player1: Player,
    private player2: Player,
    private ball: Ball,
    private collisions: Collisions
  ) {}

  drawTitle() {
    context.textAlign = "center";
    context.font = "bold 60px Courier New";
    context.fillText("P O N G", canvas.width / 2, canvas.height / 2 - 60);
  }

  drawContorls() {
    context.textAlign = "center";
    context.font = "bold 30px Courier New";
    context.fillText(
      "Press any button to start",
      canvas.width / 2,
      canvas.height / 2
    );
  }

  drawGameOver(text: string) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = "center";
    context.font = "20px Arial";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    context.font = "bold 15px Courier New";
    context.fillText(
      "Press any button to restart the game",
      canvas.width / 2,
      canvas.height / 2 + 20
    );
  }

  updatePlayer1(posY: number) {
    this.player1.setPositionY(posY);
    this.player1.drawPlayer();
  }

  updatePlayer2(posY: number) {
    this.player2.setPositionY(posY);
    this.player2.drawPlayer();
  }

  updateScorePlayer1() {
    this.player1.drawScorePlayer(PLAYER_ONE_SCORE_X, PLAYER_SCORE_Y);
  }
  updateScorePlayer2() {
    this.player2.drawScorePlayer(PLAYER_TWO_SCORE_X, PLAYER_SCORE_Y);
  }

  gameLogic(ticker: any):GameObjects {
    this.ball.moveBall(ticker);

    this.collisions.player1 = this.player1.hitPlayer(this.ball, 1);
    this.collisions.player2 = this.player2.hitPlayer(this.ball, 2);

    if (this.collisions.player1 || this.collisions.player2) {
      this.ball.bounceX();
      this.ball.setBallDirectionRandomY();
    }
    if (this.ball.getBallPositionX() > canvas.width) {
      this.player2.scored();
      this.collisions.wall = true;
      this.ball.resetPosition();
    }
    if (this.ball.getBallPositionX() < 0) {
      this.player1.scored();
      this.collisions.wall = true;
      this.ball.resetPosition();
    }

    if (this.collisions.wall) {
      let sound = new Sound();
      sound.scoreSound();
      this.collisions.wall = false;
    }

    this.collisions.ceiling =
      this.ball.getBallPositionY() < this.ball.getBallRadius() && this.ball.getBallPositionY() > 0;
    this.collisions.floor =
      this.ball.getBallPositionY() > canvas.height - this.ball.getBallRadius() && this.ball.getBallPositionY() < canvas.height;

    if (this.collisions.ceiling || this.collisions.floor) {
      let sound = new Sound();
      sound.terrainHitSound();
      this.ball.bounceY();
    }

    return {
      ball: this.ball,
      collisions: this.collisions,
      player1: this.player1,
      player2: this.player2,
    };
  }
}

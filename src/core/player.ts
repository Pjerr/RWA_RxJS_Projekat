import { Ball } from "./ball";
import { context } from "../constants/constants";
import { Position } from "../models/position";
import { Sound } from "../constants/sound";

export class Player {
  constructor(
    private width: number,
    private height: number,
    private speed: number,
    private position: Position,
    private score: number
  ) {}

  getScore() {
    return this.score;
  }

  scored() {
    this.score++;
  }

  getPositionY() {
    return this.position.y;
  }

  setPositionY(y: number) {
    this.position.y = y;
  }

  drawPlayer() {
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.width, this.height);
    context.fill();
    context.closePath();
  }

  drawScorePlayer(x: number, y: number) {
    context.font = "24px Arial";
    context.fillText(this.score.toString(), x, y);
  }

  //1-> player 1 || 2->player 2
  hitPlayer(ball: Ball, playerNo: number) {
    if (playerNo == 1) {
      if (
        ball.getBallPositionY() > this.position.y &&
        ball.getBallPositionY() < this.position.y + this.height &&
        ball.getBallPositionX() > context.canvas.width - this.width * 2
      ){
        console.log("Hit player1");
        let sound = new Sound();
        sound.playerHitSound();
        return true;
      }
    }
    if (playerNo == 2) {
      if (
        ball.getBallPositionY() > this.position.y &&
        ball.getBallPositionY() < this.position.y + this.height &&
        ball.getBallPositionX() < this.width * 2
      ) {
        console.log("hit player 2");
        let sound = new Sound();
        sound.playerHitSound();
        return true;
      }
    }
    return false;
  }

  movePlayer(positionY: number, ticker: any, directionY: number) {
    let next = positionY + directionY * ticker.deltaTime * this.speed;
    return Math.max(Math.min(next, context.canvas.height - this.height), 0);
  }
}

import { Ball } from "./ball";
import { context, PLAYER_ONE_POSITION_X, PLAYER_TWO_POSITION_X, PLAYER_WIDTH } from "../constants/constants";
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

  getScore():number {
    return this.score;
  }

  scored() {
    this.score++;
  }

  getPositionY():number {
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
  hitPlayer(ball: Ball, playerNo: number) : boolean {
    if (playerNo == 1) {
      if (
        ball.getBallPositionY() > this.position.y &&
        ball.getBallPositionY() < this.position.y + this.height &&
        ball.getBallPositionX() > PLAYER_ONE_POSITION_X && ball.getBallPositionX() < PLAYER_ONE_POSITION_X + (PLAYER_WIDTH / 2)
        // ball.getBallPositionX() > context.canvas.width - this.width * 2 //ovo nije dobro resenje
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
        ball.getBallPositionX() > PLAYER_TWO_POSITION_X + PLAYER_WIDTH && ball.getBallPositionX() < PLAYER_TWO_POSITION_X + PLAYER_WIDTH + 5
      ) {
        console.log("hit player 2");
        let sound = new Sound();
        sound.playerHitSound();
        return true;
      }
    }
    return false;
  }

  movePlayer(positionY: number, ticker: any, directionY: number):number {
    let next = positionY + directionY * ticker.deltaTime * this.speed;
    return Math.max(Math.min(next, context.canvas.height - this.height), 0);
  }
}

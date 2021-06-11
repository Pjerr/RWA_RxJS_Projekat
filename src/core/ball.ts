import { canvas, context } from "../constants/constants";
import { Direction } from "../models/direction";
import { Position } from "../models/position";

export class Ball {
  constructor(
    private ballSpeed: number,
    private ballRadius: number,
    private position: Position,
    private direction: Direction
  ) {}

  getBallSpeed() {
    return this.ballSpeed;
  }
  getBallRadius() {
    return this.ballRadius;
  }
  getBallPositionX() {
    return this.position.x;
  }
  getBallPositionY() {
    return this.position.y;
  }
  setBallPositionX(x:number){
    this.position.x=x;
  }
  setBallPositionY(y:number){
    this.position.y=y;
  }
  resetPosition(){
    this.position.x=canvas.width/2;
    this.position.y=canvas.height/2;
  }
  setBallDirectionRandom(){
    this.direction.x=(Math.random()) * 2 * (Math.random() < 0.5 ? 1 : -1);
    this.direction.y=(Math.random()) * 2 * (Math.random() < 0.5 ? 1 : -1);
  }
  setBallDirectionRandomY(){
    this.direction.y=(Math.random()) * 2 * (Math.random() < 0.5 ? 1 : -1);
  }
  bounceX(){
    this.direction.x=-this.direction.x;
  }
  bounceY(){
    this.direction.y=-this.direction.y;
  }

  drawBall() {
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.ballRadius,
      0,
      Math.PI * 2
    );
    context.fill();
    context.closePath();
  }

  moveBall(ticker:any){
    this.position.x += this.direction.x * ticker.deltaTime * this.ballSpeed;
    this.position.y += this.direction.y * ticker.deltaTime * this.ballSpeed;
  }
}

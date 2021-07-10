import { Ball } from "../core/ball";
import { Player } from "../core/player";
import { Collisions } from "./collisions";

export interface GameObjects {
  ball: Ball;
  collisions: Collisions;
  player1: Player;
  player2: Player;
}

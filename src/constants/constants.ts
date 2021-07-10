import { Direction } from "../models/direction";
import { Position } from "../models/position";

export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");

export const PADDLE_KEYS_PLAYER_ONE = {
  up: 38,
  down: 40,
};

export const PADDLE_KEYS_PLAYER_TWO = {
  up: 87,
  down: 83,
};

export const PLAYER_WIDTH = 20;
export const PLAYER_HEIGHT = 70;
export const PLAYER_SPEED = 350;

export const PLAYER_ONE_POSITION_X = context.canvas.width - 40;
export const PLAYER_TWO_POSITION_X = 20;

export const PLAYER_ONE_SCORE_X = canvas.width / 2 + 30;
export const PLAYER_TWO_SCORE_X = canvas.width / 2 - 30;
export const PLAYER_SCORE_Y = 20;

export const TICKER_INTERVAL = 15;

export const BALL_RADIUS = 8;
export const BALL_SPEED = 150;


export const DIRECTION_BALL: Direction = {
  x: (Math.random() < 0.5 ? 1 : -1) * 2,
  y:0
};

export const POSITION_BALL:Position = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

export const POSITION_PLAYER_ONE: Position = {
  x: canvas.width - 40,
  y: canvas.height / 2,
};

export const POSITION_PLAYER_TWO: Position = {
  x: 20,
  y: canvas.height / 2,
};
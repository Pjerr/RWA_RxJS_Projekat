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

export const PLAYER_ONE_POSITION_X = context.canvas.width - 40;
export const PLAYER_TWO_POSITION_X = 20;

export const PLAYER_ONE_SCORE_X = canvas.width / 2 + 30;
export const PLAYER_TWO_SCORE_X = canvas.width / 2 - 30;
export const PLAYER_SCORE_Y = 20;

export const TICKER_INTERVAL = 17;

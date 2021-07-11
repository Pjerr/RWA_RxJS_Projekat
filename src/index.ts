import { Ball } from "./core/ball";
import {
  BALL_RADIUS,
  BALL_SPEED,
  canvas,
  context,
  DIRECTION_BALL,
  PADDLE_KEYS_PLAYER_ONE,
  PADDLE_KEYS_PLAYER_TWO,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  POSITION_BALL,
  POSITION_PLAYER_ONE,
  POSITION_PLAYER_TWO,
  TICKER_INTERVAL,
} from "./constants/constants";
import { Collisions } from "./models/collisions";
import {
  animationFrameScheduler,
  combineLatest,
  fromEvent,
  interval,
  Observable,
} from "rxjs";
import {
  distinctUntilChanged,
  map,
  scan,
  withLatestFrom,
} from "rxjs/operators";
import { merge } from "rxjs";
import { Player } from "./core/player";
import { Game } from "./core/game";
import { getMatch, setMatch } from "./services/matchService";
import { GameObjects } from "./models/game-objects";

context.fillStyle = "white";

let collisions: Collisions = {
  player1: false,
  player2: false,
  floor: false,
  ceiling: false,
  wall: false,
};

let ball: Ball = new Ball(BALL_SPEED, BALL_RADIUS, POSITION_BALL, DIRECTION_BALL);
let player1: Player = new Player(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, POSITION_PLAYER_ONE, 0);
let player2: Player = new Player(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, POSITION_PLAYER_TWO, 0);

const INITIAL_OBJECTS = {
  ball,
  collisions,
  player1,
  player2,
};

const ticker$ = interval(TICKER_INTERVAL, animationFrameScheduler).pipe(
  map(() => ({
    time: Date.now(),
    deltaTime: null,
  })),
  scan((previous, current) => ({
    time: current.time,
    deltaTime: (current.time - previous.time) / 1000,
  }))
);

const player1input$:Observable<number> = merge(
  fromEvent(document, "keydown", (event: any) => {
    switch (event.keyCode) {
      case PADDLE_KEYS_PLAYER_ONE.up:
        return -1;
      case PADDLE_KEYS_PLAYER_ONE.down:
        return 1;
      default:
        return 0;
    }
  }),
  fromEvent(document, "keyup", () => 0)
);

const player1Paddle$:Observable<number> = ticker$.pipe(
  withLatestFrom(player1input$),
  scan(
    (position, [ticker, direction]) =>
      player1.movePlayer(position, ticker, direction),
    canvas.width / 2
  ),
  distinctUntilChanged()
);

const player2Input$:Observable<number> = merge(
  fromEvent(document, "keydown", (event: any) => {
    switch (event.keyCode) {
      case PADDLE_KEYS_PLAYER_TWO.up:
        return -1;
      case PADDLE_KEYS_PLAYER_TWO.down:
        return 1;
      default:
        return 0;
    }
  }),
  fromEvent(document, "keyup", () => 0)
);

const player2Paddle$:Observable<number> = ticker$.pipe(
  withLatestFrom(player2Input$),
  scan(
    (position, [ticker, directon]) =>
      player2.movePlayer(position, ticker, directon),
    canvas.height / 2
  ),
  distinctUntilChanged()
);

let game: Game = new Game(player1, player2, ball, collisions);
game.drawTitle();
game.drawContorls();

const objects$:Observable<GameObjects> = ticker$.pipe(
  withLatestFrom(player1Paddle$, player2Paddle$),
  scan(({}, [ticker]) => game.gameLogic(ticker), INITIAL_OBJECTS)
);

function showLatestMatch() {
  const btn = document.getElementById("showLatestMatchBtn");
  fromEvent(btn, "click").subscribe(() => {
    getMatch();
  });
}

const goal: number = 4; //igra se do 5
let scoreP1:number = 0;
let scoreP2:number = 0;
let gameFinished:boolean = false;

function update([ticker, player1, objects, player2]: any) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  objects.ball.drawBall();
  game.updatePlayer1(player1);
  game.updatePlayer2(player2);
  game.updateScorePlayer1();
  game.updateScorePlayer2();

  if (objects.player1.getScore() > goal) {
    game.drawGameOver("Player 1 wins!");
    play.unsubscribe();
    gameFinished = true;
    scoreP1 = objects.player1.getScore();
    scoreP2 = objects.player2.getScore();
  }

  if (objects.player2.getScore() > goal) {
    game.drawGameOver("Player 2 wins!");
    play.unsubscribe();
    gameFinished = true;
    scoreP1 = objects.player1.getScore();
    scoreP2 = objects.player2.getScore();
  }
}

const play = combineLatest([
  ticker$,
  player1Paddle$,
  objects$,
  player2Paddle$,
]).subscribe(update);

document.onkeypress = async () => {
  if(gameFinished){
    await setMatch(scoreP1, scoreP2);
  }
};

showLatestMatch();

import { Ball } from "./core/ball";
import {
  canvas,
  context,
  PADDLE_KEYS_PLAYER_ONE,
  PADDLE_KEYS_PLAYER_TWO,
  TICKER_INTERVAL,
} from "./constants/constants";
import { Direction } from "./models/direction";
import { Position } from "./models/position";
import { Collisions } from "./models/collisions";
import {
  animationFrameScheduler,
  combineLatest,
  fromEvent,
  interval,
} from "rxjs";
import {
  distinctUntilChanged,
  map,
  scan,
  take,
  takeUntil,
  withLatestFrom,
} from "rxjs/operators";
import { merge } from "rxjs";
import { Player } from "./core/player";
import { Game } from "./core/game";
import { getMatch, setMatch } from "./services/matchService";

context.fillStyle = "white";

let collisions: Collisions = {
  player1: false,
  player2: false,
  floor: false,
  ceiling: false,
  wall: false,
};

let dir: Direction = {
  x: Math.random() * 2.4 * (Math.random() < 0.5 ? 1 : -1),
  y: Math.random() * 2.4 * (Math.random() < 0.5 ? 1 : -1),
};

let pos: Position = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

let posP1: Position = {
  x: canvas.width - 40,
  y: canvas.height / 2,
};

let posP2: Position = {
  x: 20,
  y: canvas.height / 2,
};

let ball: Ball = new Ball(150, 8, pos, dir);
let player1: Player = new Player(20, 70, 350, posP1, 0);
let player2: Player = new Player(20, 70, 350, posP2, 0);

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

const player1input$ = merge(
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

const player1Paddle$ = ticker$.pipe(
  withLatestFrom(player1input$),
  scan(
    (position, [ticker, direction]) =>
      player1.movePlayer(position, ticker, direction),
    canvas.width / 2
  ),
  distinctUntilChanged()
);

const player2Input$ = merge(
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

const player2Paddle$ = ticker$.pipe(
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

const objects$ = ticker$.pipe(
  withLatestFrom(player1Paddle$, player2Paddle$),
  scan(({}, [ticker]) => game.calculateObjects(ticker), INITIAL_OBJECTS)
);

function pokaziPartiju() {
  const label = document.getElementById("partijaLbl");
  const btn = document.getElementById("pokaziPartijuBtn");
  const click = fromEvent(btn, "click").subscribe(() => {
    getMatch();
  });
}

const goal: number = 5;
let score1: number;
let score2: number;

function update([ticker, player1, objects, player2]: any) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  objects.ball.drawBall();
  game.updatePlayer1(player1);
  game.updatePlayer2(player2);
  game.updateScorePlayer1();
  game.updateScorePlayer2();

  if (objects.player1.getScore() > goal) {
    score1 = objects.player1.getScore();
    score2 = objects.player2.getScore();
    console.log("EVO ME U UPDATE p1", score1, score2);
    game.drawGameOver("Player 1 wins!\nThe game will reset after 5 sec...");
    play.unsubscribe();
    setMatch(score1, score2);
  }

  if (objects.player2.getScore() > goal) {
    score1 = objects.player1.getScore();
    score2 = objects.player2.getScore();
    console.log("Evo me u update p2", score1, score2);
    game.drawGameOver("Player 2 wins!\nThe game will reset after 5 sec...");
    play.unsubscribe();
    setMatch(score1, score2);
  }
}

const play = combineLatest([
  ticker$,
  player1Paddle$,
  objects$,
  player2Paddle$,
]).subscribe(update);

pokaziPartiju();
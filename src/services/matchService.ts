import { PreviousMatch } from "../models/previousMatch";

const axios = require("axios");

export const getMatch = async (score1:number, score2:number) => {
  await fetch("http://localhost:3000/match/?id=0")
    .then((response) => response.json())
    .then((data) => {
      score1 = data[0].player1,
      score2 = data[0].player2,
      console.log("izlazim iz get", score1, score2);
    });
};

export const setMatch = (score1:number, score2:number)=> {
  setTimeout(() => {
    const res = axios.put("http://localhost:3000/match/0", {
      player1: score1,
      player2: score2
    });
  }, 5000);
};

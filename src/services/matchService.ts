const axios = require("axios");

const label = document.getElementById("showLatestMatchLbl");

export const getMatch = async () => {
  await fetch("http://localhost:3000/match/?id=0")
    .then((response) => response.json())
    .then((data) => {
      label.innerHTML = `Player1: ${data[0].player1} \n Player2: ${data[0].player2}`;
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

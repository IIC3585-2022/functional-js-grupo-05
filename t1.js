const _ = require("lodash");

const start_msg = "Juego inicializado con jugadores";
const turn_msg = "Ingrese lanzamientos de";
const end_msg = "El juego ha finalizado, un jugador ha llegado a 0 puntos. Felicidades por ganar";

const ingresar_jugada = () => undefined;

const init_game = (players) => undefined;

const play_game = (...players) => 
{
  const gamers = init_game(players);
  
  // Start game msg
  msg_curried(start_msg)(...players);

  // Game loop
  msg_curried(turn_msg)(players[0]);

  // Game ending
  msg_curried(end_msg)(players[1]);
};

const msg_curried = (msg) =>
{
  return (...players) => {
    console.log(msg + " " + players.reduce((acc, player) => acc + ", " + player));
  };
};

play_game('Ema', 'Juan');

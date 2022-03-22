const _ = require("lodash");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ingresar_jugada = () => undefined;

const init_game = (players) => undefined;

const play_game = (...players) => 
{
  const gamers = init_game(players);
  
  // Start game msg
  msg_curried("Juego inicializado con jugadores")(...players);

  // Game loop
  const winner = game_loop(gamers)(0);

  // Game ending
  msg_curried("El juego ha finalizado, un jugador ha llegado a 0 puntos. Felicidades por ganar")(winner[0]);
};

const msg_curried = (msg) =>
{
  return (...players) => {
    console.log(msg + " " + players.reduce((acc, player) => acc + ", " + player));
  };
};

const min_score = (players) => {
  return players.filter(player => player[1] == 0);
};

const game_loop = (players) => {
  return (turn) => {
    rl.question("Ingrese lanzamientos de " + players[turn][0], (plays) => {
      players[turn] = ingresar_jugada(players[turn], plays);
      rl.close();
    });
    const winner = min_score(players);
    winner.length == 1 ? winner[0] : game_loop(players)((turn + 1)% players.length);
  };
};

play_game('Ema', 'Juan');
//game_loop([]);

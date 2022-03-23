const _ = require("lodash");
const readline = require("readline");


const ingresar_jugada = (player, score, plays) => [player, get_score(score, plays)];
const abuild = (list_, f) => list_.map(f);
const init_game = (players) => abuild(players, x => [x, 501]); 

const play_game = async (...players) => {
  const gamers = init_game(players);
  msg_curried("Juego inicializado con jugadores")(...players);
  const winner = await game_loop(gamers)(0);
  msg_curried("El juego ha finalizado, un jugador ha llegado a 0 puntos. Felicidades por ganar")(winner[0]);
};

const msg_curried = (msg) => (...players) => console.log(msg + " " + players.reduce((acc, player) => acc + ", " + player));
const min_score = (players) => players.filter(player => player[1] == 0);

const game_loop = (players) => {
  return async (turn) => {
    const plays = await get_input("\nIngrese lanzamientos de " + players[turn][0] + ": ");
    players[turn] = ingresar_jugada(players[turn][0], players[turn][1], JSON.parse(plays));
    const winner = min_score(players);
    print_scores(players)
    return winner.length == 1 ? winner[0] : game_loop(players)((turn + 1)% players.length);
  };
};

const get_input = (msg) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(msg, ans => {
    rl.close();
    resolve(ans);
  }));
};

const get_score = (pActual, throws) => {
    let winner = false;
    throws.map(x => {
        x == 'DB'
            ? pActual = Math.abs(pActual-50)
            : x == 'SB' 
                ? pActual = Math.abs(pActual-25)
                : pActual = Math.abs(pActual - x.reduce((x1, x2) => (x1*x2)))
        if (pActual == 0){winner = true};
    })
    return winner ? 0 : pActual;
}; 

const print_scores = (players) => players.forEach(player => console.log("Puntaje de " + player[0] + ": " + player[1]));

async function init_players(){
  const players = await get_input("Ingrese el nombre de los jugadores: ");
  play_game(...players.split(','))
}

init_players()
const _ = require("lodash");
const readline = require("readline");


const ingresar_jugada = (player, score, plays) => [player, get_score(score, plays)];
const abuild = (list_, f) => list_.map(f);
const init_game = (players) => abuild(players, x => [x, 501]); 

const play_game = async (...players) => {
  const gamers = init_game(players);
  msg_curried("Juego inicializado con jugadores")(...players);
  const winner = await game_loop(gamers, [[[3,20],[3,19],[2,12]],[[3,13],[3,13],[3,13]],[[3,20],[3,20],[3,20]],[[3,12],[3,12],[3,12]],[[3,20],[3,20],[3,20]]])(0);

  msg_curried("El juego ha finalizado, un jugador ha llegado a 0 puntos. Felicidades por ganar")(winner[0]);
};

const msg_curried = (msg) => (...players) => console.log(msg + " " + players.reduce((acc, player) => acc + ", " + player));
const min_score = (players) => players.filter(player => player[1] == 0);

const game_loop = (players, allPlays) => {
  return async (turn) => {
    console.log("\nIngrese lanzamientos de " + players[turn][0] + ": ")
    const plays = allPlays.pop()
    await new Promise(r => setTimeout(r,4000));
    console.log(" ", plays)
    players[turn] = ingresar_jugada(players[turn][0], players[turn][1], plays);
    const winner = min_score(players);
    print_scores(players)
    return winner.length == 1 ? winner[0] : game_loop(players, allPlays)((turn + 1)% players.length);
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
  const players = console.log("Ingrese el nombre de los jugadores: ");
  await new Promise(r => setTimeout(r,1000));

  play_game('Gary', 'Joe')
}

init_players()
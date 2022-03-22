const _ = require("lodash");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ingresar_jugada = (player, score, plays) => {
    final_score = get_score(score, plays)
    return [player, final_score]
}

const init_game = (players) => {
    // Ejemplo retorno: [[ 'chamo', 501], ['elias', 501], ['javi', 501]]
    const abuild = (list_, f)=>list_.map(f) 
    return abuild(players, x=>[x, 501])
 } ; 

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

const get_score = (pActual, throws) => {
    // Recibe puntaje del jugador que lanza y sus tres lanzamientos
    // Retorna el puntaje del jugador luego de los tres lanzamientos
    // El cálculo se realiza para cada lanzamiento y se retorna el valor del cálculo final.
    // Si en alguno de los tres lanzamientos el puntaje se hace cero, entonces retorna 0
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

play_game('Ema', 'Juan');
//game_loop([]);

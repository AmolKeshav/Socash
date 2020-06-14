const Deck = require('./classes/Deck');
const Player = require('./classes/Player');
const Board = require('./classes/Board');
const config = require('./config');

const playDrunkCardGame = (deckDetails, numberOfPlayers, numberOfCardsPerPlayer) => {
  let deck = new Deck(deckDetails.suites, deckDetails.rankValues);
  let players = [];
  let winner = null;

  for (let itr = 0; itr < numberOfPlayers; itr++) {
    let player = new Player(itr + 1);
    players.push(player);
  }

  let board = new Board(deck, players, numberOfCardsPerPlayer);

  board.dealCards();
  board.playersEvaluateHand(config.winnerOrderValue);
  
  winner = board.showHands();

  if (winner.winnerFlag) {
    console.log("We have a Winner: ", JSON.stringify(winner.winner));
  } else {
    winner = board.breakTieBreaker(winner.contendors);
  }
}

playDrunkCardGame(config.deckDetails, config.numberOfPlayers, config.numberOfCardsPerPlayer);
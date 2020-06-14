const Deck = require('./classes/Deck');
const Player = require('./classes/Player');
const Board = require('./classes/Board');
const config = require('./config');

const playDrunkCardGame = (deckDetails, numberOfPlayers, numberOfCardsPerPlayer) => {
  let deck = new Deck(deckDetails.suites, deckDetails.rankValues);
  let players = [];

  for (let itr = 0; itr < numberOfPlayers; itr++) {
    let player = new Player(itr);
    players.push(player);
  }

  let board = new Board(deck, players, numberOfCardsPerPlayer);

  board.dealCards();
  board.showHands();
}

playDrunkCardGame(config.deckDetails, config.numberOfPlayers, config.numberOfCardsPerPlayer);
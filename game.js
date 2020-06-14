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

  board.printDeck();
  board.dealCards();
  board.printPlayerHand();
  board.playersEvaluateHand(config.winnerOrderValue);
  
  winner = board.showHands();

  if (winner.winnerFlag) {
    console.log("========================= Result: Clear Winner ===================================");
    console.log("Player with PlayerId: ", winner.winner.playerId, " wins the game because of: ", winner.winner.handDetails.handCategory, "\n\n");
  } else {
    console.log("========================= Result: It's a tie! ===================================");
    let play = "";
    
    for (let itr = 0; itr < winner.contendors.length; itr++) {
      play += winner.contendors[itr].playerId + " (" + winner.contendors[itr].handDetails.handCategory + ") ";
    }
    console.log("Players with player ids: ", play, " are locked in a tie. Now we decide the winner using the tie-breaker!")
    
    winner = board.breakTieBreaker(winner.contendors);

    console.log("\n\nPlayer with PlayerId: ", winner.winner.playerId, " wins the game. \n\n");    
  }
}

playDrunkCardGame(config.deckDetails, config.numberOfPlayers, config.numberOfCardsPerPlayer);
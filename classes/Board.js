/**
 * Class definition of the Board of the game
 */

module.exports = class Board {
  constructor(deck, players, numberOfCardsPerPlayer) {
    this.deck = deck;
    this.players = players;
    this.numberOfCardsPerPlayer = numberOfCardsPerPlayer;
  }

  dealCards() {
    let numberOfPlayers = this.players.length,
      numberOfCardsPerPlayer = this.numberOfCardsPerPlayer,
      numberOfCardsToDraw = numberOfCardsPerPlayer * numberOfPlayers,
      playerItr = 0;

    while (numberOfCardsToDraw) {
      let card = this.deck.dealTheDeck();
      this.players[playerItr++].pickCard(card);
      if (playerItr >= this.players.length) {
        playerItr = 0;
      }
      numberOfCardsToDraw--;
    }
  } 

  playersEvaluateHand() {
    for (let itr = 0; itr < this.players.length; itr++) {
      console.log("Considering Player: ", itr + 1, "\n");
      this.players[itr].evaluateHand();
    }
  }

  showHands() {
    console.log(JSON.stringify(this.players));
    console.log(this.deck.deck.length);
  }
}
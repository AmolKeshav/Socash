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

  showHands() {
    console.log(JSON.stringify(this.players));
  }
}
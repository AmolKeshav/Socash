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

  playersEvaluateHand(winnerOrderValue) {
    for (let itr = 0; itr < this.players.length; itr++) {
      this.players[itr].evaluateHand(winnerOrderValue);
    }
  }

  showHands() {
    for (let itr = 0; itr < this.players.length - 1; itr++) {
      for (let jtr = itr + 1; jtr < this.players.length; jtr++) {
        if (this.players[itr].handDetails.handPriorityValue < this.players[jtr].handDetails.handPriorityValue) {
          [this.players[itr], this.players[jtr]] = [this.players[jtr], this.players[itr]];
        }
      }
    }

    if (this.players[0].handDetails.handPriorityValue > this.players[1].handDetails.handPriorityValue) {
      return {
        winnerFlag: true,
        winner: this.players[0],
        contendors: this.players // To be removed!
      };
    } else {
      let priorityValue = this.players[0].handDetails.handPriorityValue, itr = 0, contendors = [];
      while (priorityValue === this.players[itr].handDetails.handPriorityValue) {
        contendors.push(this.players[itr]);
        itr++;
      }

      return {
        winnerFlag: false,
        contendors: contendors
      }
    }
  }

  breakTieBreaker(contendors) {
    while (true) {
      for (let itr = 0; itr < contendors.length; itr++) {
        let card = this.deck.dealTheDeck();
        contendors[itr].emptyHand();
        contendors[itr].pickCard(card);
      }

      for (let itr = 0; itr < contendors.length - 1; itr++) {
        for (let jtr = itr + 1; jtr < contendors.length; jtr++) {
          if (contendors[itr].hand[0].p < contendors[jtr].hand[0].p) {
            [contendors[itr], contendors[jtr]] = [contendors[jtr], contendors[itr]];
          }
        }
      }

      if (contendors[0].hand[0].p > contendors[1].hand[0].p) {
        return {
          winnerFlag: true,
          winner: contendors[0]
        }
      }
    }
  }
}
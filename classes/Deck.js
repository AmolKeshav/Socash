/**
 * Class definition of the Deck used in the game
 */

const Card = require('./Card');

module.exports = class Deck {
  constructor(suites, ranksValues) {
    this.suites = suites;
    this.ranksValues = ranksValues;
    this.deck = [];

    this.createNewDeck();
    this.shuffleDeck();
  }

  createNewDeck() {
    this.deck = [];

    for (let itr = 0; itr < this.suites.length; itr++) {
      for (let jtr = 0; jtr < this.ranksValues.length; jtr++) {
        let card = new Card(this.suites[itr], this.ranksValues[jtr].rank, this.ranksValues[jtr].value, this.ranksValues[jtr].p);
        
        this.deck.push(card);
      }
    }
  }
  
  // Using Fisher-Yates algorithm to generate a shuffled deck
  shuffleDeck() {
    const { deck } = this;
    let deckLength = deck.length, itr;

    while (deckLength) {
      itr = Math.floor(Math.random() * deckLength--);
      
      [deck[deckLength], deck[itr]] = [deck[itr], deck[deckLength]];
    }

    return this;
  }

  dealTheDeck() {
    return this.deck.pop();
  }
}
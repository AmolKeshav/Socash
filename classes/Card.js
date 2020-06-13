/**
 * 
 * Class definition of a single card of the deck
 * 
 */

module.exports = class Card {
  constructor(suit, rank, value, p) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.p = p;
  }
}

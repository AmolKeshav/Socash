/**
 * Class definition of the player
 */

module.exports = class Player {
  constructor(playerId) {
    this.playerId = playerId;
    this.hand = [];
  }

  pickCard(card) {
    this.hand.push(card);
  }
}
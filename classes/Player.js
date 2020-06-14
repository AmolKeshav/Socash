/**
 * Class definition of the player
 */

module.exports = class Player {
  constructor(playerId) {
    this.playerId = playerId;
    this.hand = [];
    this.handDetails = null;
  }

  emptyHand() {
    this.hand = [];
    this.handDetails = null;
  }

  pickCard(card) {
    this.hand.push(card);
  }

  checkIfTrail(winnerOrderValue) {
    let itr = 1;
    while (itr < this.hand.length) {
      if (this.hand[itr - 1].rank !== this.hand[itr].rank) { break; }
      itr++;
    }

    if (itr == this.hand.length) {
      return {
        handPriorityValue: winnerOrderValue["TRAIL"] + highestCard.p,
        handCat: winnerOrderValue["TRAIL"],
        cardToCompare: this.hand[0] 
      }
    } else {
      return false;
    }
  }

  checkIfSequence(winnerOrderValue) {
    let lowest = 100, highest = -1, sum = 0, arithmeticSum, highestCard;

    for (let itr = 0; itr < this.hand.length; itr++) {
      let currentValue = this.hand[itr].value
      if (currentValue < lowest) { lowest = currentValue; }
      if (currentValue > highest) { 
        highest = currentValue; 
        highestCard = this.hand[itr]; 
      }
      sum += currentValue;
    }

    arithmeticSum = (this.hand.length * (lowest + highest)) / 2;

    if (sum == arithmeticSum && (highest - lowest) == this.hand.length - 1) {
      return {
        handPriorityValue: winnerOrderValue["SEQUENCE"] + highestCard.p,
        handCategory: winnerOrderValue["SEQUENCE"],
        cardToCompare: highestCard
      }
    } else {
      return false;
    }
  }

  checkIfPair(winnerOrderValue) {
    let tempObject = {}, highestCard = null;
    for (let itr = 0; itr < this.hand.length; itr++) {
      if (!tempObject.hasOwnProperty(this.hand[itr].rank)) {
        tempObject[this.hand[itr].rank] = 1;
      } else {
        tempObject[this.hand[itr].rank] += 1;
        if (tempObject[this.hand[itr].rank] > (this.hand.length / 2)) {
          highestCard = this.hand[itr];
        }
      }
    }

    if (highestCard !== null) {
      return {
        handPriorityValue: winnerOrderValue["PAIR"] + highestCard.p,
        handCategory: winnerOrderValue["PAIR"],
        cardToCompare: highestCard
      }
    } else {
      return false;
    }
  }

  checkIfTopCard(winnerOrderValue) {
    let highestCard = this.hand[0];
    for (let itr = 1; itr < this.hand.length; itr++) {
      if (this.hand[itr].p > highestCard.p) {
        highestCard = this.hand[itr];
      }
    }

    return {
      handPriorityValue: winnerOrderValue["HIGHEST"] + highestCard.p,
      handCategory: winnerOrderValue["HIGHEST"],
      cardToCompare: highestCard
    }
  }

  evaluateHand(winnerOrderValue) {
    this.handDetails = null;
    let val = null;

    if (val = this.checkIfTrail(winnerOrderValue)) { 
      this.handDetails = val; 
    } else if (val = this.checkIfSequence(winnerOrderValue)) { 
      this.handDetails = val; 
    } else if (val = this.checkIfPair(winnerOrderValue)) { 
      this.handDetails = val; 
    } else {
      this.handDetails = this.checkIfTopCard(winnerOrderValue);
    }
  }
}
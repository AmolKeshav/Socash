/**
 * Class definition of the player
 */

module.exports = class Player {
  constructor(playerId) {
    this.playerId = playerId;
    this.hand = [];
    this.handDetails = null;
  }

  pickCard(card) {
    this.hand.push(card);
  }

  checkIfTrail() {
    let itr = 1;
    while (itr < this.hand.length) {
      if (this.hand[itr - 1].rank !== this.hand[itr].rank) { break; }
      itr++;
    }

    if (itr == this.hand.length) {
      return {
        handCat: "TRAIL",
        cardToCompare: this.hand[0] 
      }
    } else {
      return false;
    }
  }

  checkIfSequence() {
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
        handCategory: "SEQUENCE",
        cardToCompare: highestCard
      }
    } else {
      return false;
    }
  }

  checkIfPair() {
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
        handCategory: "PAIR",
        cardToCompare: highestCard
      }
    } else {
      return false;
    }
  }

  checkIfTopCard() {
    let highestCard = this.hand[0];
    for (let itr = 1; itr < this.hand.length; itr++) {
      if (this.hand[itr].p > highestCard.p) {
        highestCard = this.hand[itr];
      }
    }

    return {
      handCategory: "HIGHEST",
      cardToCompare: highestCard
    }
  }

  evaluateHand() {
    this.handDetails = null;
    console.log("PLAYERS HAND:: ", JSON.stringify(this.hand));
    if (this.checkIfTrail()) { 
      this.handDetails = this.checkIfTrail(); 
    } else if (this.checkIfSequence()) { 
      this.handDetails = this.checkIfSequence(); 
    } else if (this.checkIfPair()) { 
      this.handDetails = this.checkIfPair(); 
    } else {
      this.handDetails = this.checkIfTopCard();
    }

    console.log(this.handDetails);
  }
}
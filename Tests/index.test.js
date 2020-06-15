/**
 * Tests
 */

const assert = require("assert"),
  config = require('../config'),
  Deck = require('../classes/Deck'),
  Player = require('../classes/Player'),
  Card = require('../classes/Card');

describe ("Deck Test", () => {
  it ("Should be able to create a new deck", () => {
    let suite = ["Diamond"],
      rankValues = [{
        rank: "Ace",
        value: 1,
        p: 13
      }, {
        rank: "King",
        value: 13,
        p: 12
      }];
    let deck = new Deck(suite, rankValues);

    assert.strictEqual(deck.deck.length, 2);
  });
});

describe ("Player Test", () => {
  it ("Should be able to create a new player", () => {
    let player = new Player(10);

    assert.strictEqual(player.playerId, 10);
    assert.strictEqual(player.hand.length, 0);
    assert.strictEqual(player.handDetails, null);
  });

  it ("Should be able to add a new card in hand", () => {
    let player = new Player(10);
    let card = new Card("Diamond", "Ace", 1, 13);

    player.pickCard(card);

    assert.strictEqual(player.hand.length, 1);
    assert.strictEqual(player.hand[0].suit, "Diamond");
  });

  it ("Should be able to add a empty hand", () => {
    let player = new Player(10);
    let card = new Card("Diamond", "Ace", 1, 13);

    player.pickCard(card);

    assert.strictEqual(player.hand.length, 1);
    assert.strictEqual(player.hand[0].suit, "Diamond");

    player.emptyHand();

    assert.strictEqual(player.hand.length, 0);
  });

  it ("Should be able to detect a TRAIL", () => {
    let player = new Player(10);
    let card1 = new Card("Diamond", "Ace", 1, 13),
      card2 = new Card("Spades", "Ace", 1, 13),
      card3 = new Card("Hearts", "Ace", 1, 13);


    player.pickCard(card1);
    player.pickCard(card2);
    player.pickCard(card3);

    let details = player.checkIfTrail(config.winnerOrderValue);

    assert.strictEqual(player.hand.length, 3);
    assert.strictEqual(details.handPriorityValue, 1000);
  });

  it ("Should be able to detect a SEQUENCE", () => {
    let player = new Player(10);
    let card1 = new Card("Diamond", "Jack", 11, 10),
      card2 = new Card("Spades", "King", 13, 12),
      card3 = new Card("Hearts", "QUEEN", 12, 11);


    player.pickCard(card1);
    player.pickCard(card2);
    player.pickCard(card3);

    let details = player.checkIfSequence(config.winnerOrderValue);

    assert.strictEqual(player.hand.length, 3);
    assert.strictEqual(details.handPriorityValue, 912);
  });

  it ("Should be able to detect a PAIR", () => {
    let player = new Player(10);
    let card1 = new Card("Diamond", "King", 13, 12),
      card2 = new Card("Spades", "King", 13, 12),
      card3 = new Card("Hearts", "QUEEN", 12, 11);


    player.pickCard(card1);
    player.pickCard(card2);
    player.pickCard(card3);

    let details = player.checkIfPair(config.winnerOrderValue);

    assert.strictEqual(player.hand.length, 3);
    assert.strictEqual(details.handPriorityValue, 812);
  });

  it ("Should be able to detect a PAIR", () => {
    let player = new Player(10);
    let card1 = new Card("Diamond", "King", 13, 12),
      card2 = new Card("Spades", "King", 13, 12),
      card3 = new Card("Hearts", "QUEEN", 12, 11);


    player.pickCard(card1);
    player.pickCard(card2);
    player.pickCard(card3);

    let details = player.checkIfTopCard(config.winnerOrderValue);

    assert.strictEqual(player.hand.length, 3);
    assert.strictEqual(details.handPriorityValue, 712);
  });

  it ("Should be able evaluate a hand", () => {
    let player = new Player(10);
    let card1 = new Card("Diamond", "King", 13, 12),
      card2 = new Card("Spades", "King", 13, 12),
      card3 = new Card("Hearts", "QUEEN", 12, 11);


    player.pickCard(card1);
    player.pickCard(card2);
    player.pickCard(card3);

    let details = player.evaluateHand(config.winnerOrderValue);

    assert.strictEqual(player.hand.length, 3);
    assert.strictEqual(player.handDetails.handPriorityValue, 812);
  });
})
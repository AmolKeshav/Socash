/**
 * Configuration for the game
 */

module.exports = {
  deckDetails: {
    suites: ["Spades", "Diamonds", "Hearts", "Clubs"],
    rankValues: [{
      rank: "Ace",
      value: 1,
      p: 13
    }, {
      rank: "2",
      value: 2,
      p: 1
    }, {
      rank: "3",
      value: 3,
      p: 2
    }, {
      rank: "4",
      value: 4,
      p: 3
    }, {
      rank: "5",
      value: 5,
      p: 4
    }, {
      rank: "6",
      value: 6,
      p: 5
    }, {
      rank: "7",
      value: 7,
      p: 6
    }, {
      rank: "8",
      value: 8,
      p: 7
    }, {
      rank: "9",
      value: 9,
      p: 8
    }, {
      rank: "10",
      value: 10,
      p: 9
    }, {
      rank: "Jack",
      value: 11,
      p: 10
    }, {
      rank: "Queen",
      value: 12,
      p: 11
    }, {
      rank: "King",
      value: 13,
      p: 12
    }]
  },
  numberOfPlayers: 4,
  numberOfCardsPerPlayer: 3
}
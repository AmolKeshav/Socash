const Deck = require('./classes/Deck');
const config = require('./config');

const deck = new Deck(config.deckDetails.suites, config.deckDetails.rankValues);

console.log(deck);
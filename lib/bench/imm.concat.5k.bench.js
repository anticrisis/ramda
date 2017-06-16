var concat = require('../..').concat;
var range = require('../..').range;
var I = require('immutable');

var s1 = I.List(range(0, 4999));
var s2 = I.List(range(5000, 9999));
var concatS1 = concat(s1);

module.exports = {
  name: 'Immutable concat 5k',
  tests: {
    'concat(s1, s2)': function() {
      concat(s1, s2);
    },
    'concat(s1)(s2)': function() {
      concat(s1)(s2);
    },
    'concatS1(s2)': function() {
      concatS1(s2);
    },
    'native concat': function() {
      s1.concat(s2);
    }
  }
};

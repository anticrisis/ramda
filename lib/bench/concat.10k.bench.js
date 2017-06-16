var concat = require('../..').concat;
var range = require('../..').range;

var s1 = range(0, 9999);
var s2 = range(10000, 19999);
var concatS1 = concat(s1);

module.exports = {
  name: 'concat 10k',
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

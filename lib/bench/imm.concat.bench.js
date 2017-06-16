var concat = require('../..').concat;
var I = require('immutable');

var s1 = I.List([8, 2, 85, 2, 34, 3, 23]);
var s2 = I.List([247, 57, 8, 0, 6, 5, 46, 54, 643]);
var s1n = s1.toJS();
var s2n = s2.toJS();

var concatS1 = concat(s1);

module.exports = {
  name: 'immutable concat',
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
      s1n.concat(s2n);
    }
  }
};

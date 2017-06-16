var map = require('../..').map;
var I = require('immutable');

var nums = I.List([8, 2, 85, 2, 34, 3, 23, 247, 57, 8, 0, 6, 5, 46, 54, 643]);
var numsn = nums.toJS();

function sq(x) { return x * x; }
var mapSq = map(sq);

module.exports = {
  name: 'Immutable map',
  tests: {
    'map(sq, nums)': function() {
      map(sq, nums);
    },
    'map(sq)(nums)': function() {
      map(sq)(nums);
    },
    'mapSq(nums)': function() {
      mapSq(nums);
    },
    'native map': function() {
      numsn.map(sq);
    }
  }
};

var R = require('..');
var eq = require('./shared/eq');
var I = require ('immutable');

var List = I.List;

describe('aperture', function() {
  var sevenLs = [1, 2, 3, 4, 5, 6, 7];
  var immSevenLs = I.List(sevenLs);
  it('creates a list of n-tuples from a list', function() {
    eq(R.aperture(1, sevenLs), [[1], [2], [3], [4], [5], [6], [7]]);
    eq(R.aperture(2, sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
    eq(R.aperture(3, sevenLs), [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7]]);
    eq(R.aperture(4, [1, 2, 3, 4]), [[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', function() {
    eq(R.aperture(6, [1, 2, 3]), []);
    eq(R.aperture(1, []), []);
  });

  it('is curried', function() {
    var pairwise = R.aperture(2);
    eq(pairwise(sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
  });

  it('can act as a transducer', function() {
    eq(R.into([], R.aperture(2), sevenLs), [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]);
  });

  it('Immutable: creates a list of n-tuples from a list', function() {
    eq(R.aperture(1, immSevenLs), List([List([1]), List([2]), List([3]), List([4]), List([5]), List([6]), List([7])]));
    eq(R.aperture(2, immSevenLs), List([List([1, 2]), List([2, 3]), List([3, 4]), List([4, 5]), List([5, 6]), List([6, 7])]));
    eq(R.aperture(3, immSevenLs), List([List([1, 2, 3]), List([2, 3, 4]), List([3, 4, 5]), List([4, 5, 6]), List([5, 6, 7])]));
    eq(R.aperture(4, I.List([1, 2, 3, 4])), I.List([List([1, 2, 3, 4])]));
  });

  it('Immutable: returns an empty list when `n` > `list.length`', function() {
    eq(R.aperture(6, List([1, 2, 3])), List());
    eq(R.aperture(1, List()), List());
  });

  it('Immutable: is curried', function() {
    var pairwise = R.aperture(2);
    eq(pairwise(immSevenLs), List([List([1, 2]), List([2, 3]), List([3, 4]), List([4, 5]), List([5, 6]), List([6, 7])]));
  });

  it('Immutable: can act as a transducer', function() {
    eq(R.into(I.List(), R.aperture(2), immSevenLs), List([List([1, 2]), List([2, 3]), List([3, 4]), List([4, 5]), List([5, 6]), List([6, 7])]));
  });

});

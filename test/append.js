var R = require('..');
var eq = require('./shared/eq');
var I = require('immutable');

describe('append', function() {
  it('adds the element to the end of the list', function() {
    eq(R.append('z', ['x', 'y']), ['x', 'y', 'z']);
    eq(R.append(['a', 'z'], ['x', 'y']), ['x', 'y', ['a', 'z']]);
  });

  it('works on empty list', function() {
    eq(R.append(1, []), [1]);
  });

  it('is curried', function() {
    eq(typeof R.append(4), 'function');
    eq(R.append(1)([4, 3, 2]), [4, 3, 2, 1]);
  });

});


describe('Immutable: append', function() {
  it('adds the element to the end of the list', function() {
    eq(R.append('z', I.List(['x', 'y'])), I.List(['x', 'y', 'z']));
    eq(R.append(I.List(['a', 'z']), I.List(['x', 'y'])), I.List(['x', 'y', I.List(['a', 'z'])]));
  });

  it('works on empty list', function() {
    eq(R.append(1, I.List()), I.List([1]));
  });

  it('is curried', function() {
    eq(typeof R.append(4), 'function');
    eq(R.append(1)(I.List([4, 3, 2])), I.List([4, 3, 2, 1]));
  });

  it('works with one List and one Array', function() {
    eq(R.append('z', I.List(['x', 'y'])), I.List(['x', 'y', 'z']));
    eq(R.append(I.List(['a', 'z']), ['x', 'y']), I.List(['x', 'y', I.List(['a', 'z'])]));
  });


});

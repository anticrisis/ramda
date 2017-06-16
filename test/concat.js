var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');
var I = require('immutable');

describe('concat', function() {
  it('adds combines the elements of the two lists', function() {
    eq(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(R.concat([], ['c', 'd']), ['c', 'd']);
  });

  var z1 = {
    x: 'z1',
    concat: function(that) { return this.x + ' ' + that.x; }
  };
  var z2 = {
    x: 'z2'
  };

  it('adds combines the elements of the two lists', function() {
    eq(R.concat(['a', 'b'], ['c', 'd']), ['a', 'b', 'c', 'd']);
    eq(R.concat([], ['c', 'd']), ['c', 'd']);
  });

  it('works on strings', function() {
    eq(R.concat('foo', 'bar'), 'foobar');
    eq(R.concat('x', ''), 'x');
    eq(R.concat('', 'x'), 'x');
    eq(R.concat('', ''), '');
  });

  it('delegates to non-String object with a concat method, as second param', function() {
    eq(R.concat(z1, z2), 'z1 z2');
  });

  it('is curried', function() {
    var conc123 = R.concat([1, 2, 3]);
    eq(conc123([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
    eq(conc123(['a', 'b', 'c']), [1, 2, 3, 'a', 'b', 'c']);
  });

  it('is curried like a binary operator, that accepts an initial placeholder', function() {
    var appendBar = R.concat(R.__, 'bar');
    eq(typeof appendBar, 'function');
    eq(appendBar('foo'), 'foobar');
  });

  it('throws if attempting to combine an array with a non-array', function() {
    assert.throws(function() { return R.concat([1], 2); }, TypeError);
  });

  it('throws if not an array, String, or object with a concat method', function() {
    assert.throws(function() { return R.concat({}, {}); }, TypeError);
  });

});

describe('Immutable concat', function() {
  it('adds combines the elements of the two lists', function() {
    eq(R.concat(I.List(['a', 'b']), I.List(['c', 'd'])), I.List(['a', 'b', 'c', 'd']));
    eq(R.concat(I.List(), I.List(['c', 'd'])), I.List(['c', 'd']));
  });

  var z1 = I.Map({
    x: 'z1',
    concat: function(that) { return this.get('x') + ' ' + that.get('x'); }
  });
  var z2 = I.Map({
    x: 'z2'
  });

  it('adds combines the elements of the two lists', function() {
    eq(R.concat(I.List(['a', 'b']), I.List(['c', 'd'])), I.List(['a', 'b', 'c', 'd']));
    eq(R.concat(I.List(), I.List(['c', 'd'])), I.List(['c', 'd']));
  });

  it('works on strings', function() {
    eq(R.concat('foo', 'bar'), 'foobar');
    eq(R.concat('x', ''), 'x');
    eq(R.concat('', 'x'), 'x');
    eq(R.concat('', ''), '');
  });

  it('delegates to non-String object with a concat method, as second param', function() {
    eq(R.concat(z1, z2), 'z1 z2');
  });

  it('is curried', function() {
    var conc123 = R.concat(I.List([1, 2, 3]));
    eq(conc123(I.List([4, 5, 6])), I.List([1, 2, 3, 4, 5, 6]));
    eq(conc123(I.List(['a', 'b', 'c'])), I.List([1, 2, 3, 'a', 'b', 'c']));
  });

  it('is curried like a binary operator, that accepts an initial placeholder', function() {
    var appendBar = R.concat(R.__, 'bar');
    eq(typeof appendBar, 'function');
    eq(appendBar('foo'), 'foobar');
  });

  it('throws if attempting to combine an array with a non-array', function() {
    assert.throws(function() { return R.concat([1], 2); }, TypeError);
  });

  it('throws if not an array, String, or object with a concat method', function() {
    assert.throws(function() { return R.concat({}, {}); }, TypeError);
  });

});

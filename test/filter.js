var R = require('..');
var eq = require('./shared/eq');
var I = require('immutable');

describe('filter', function() {
  var even = function(x) {return x % 2 === 0;};

  it('reduces an array to those matching a filter', function() {
    eq(R.filter(even, [1, 2, 3, 4, 5]), [2, 4]);
  });

  it('returns an empty array if no element matches', function() {
    eq(R.filter(function(x) { return x > 100; }, [1, 9, 99]), []);
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.filter(function(x) { return x > 100; }, []), []);
  });

  it('filters objects', function() {
    var positive = function(x) { return x > 0; };
    eq(R.filter(positive, {}), {});
    eq(R.filter(positive, {x: 0, y: 0, z: 0}), {});
    eq(R.filter(positive, {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.filter(positive, {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.filter(positive, {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    var f = {filter: function(f) { return f('called f.filter'); }};
    eq(R.filter(function(s) { return s; }, f), 'called f.filter');
  });

  it('is curried', function() {
    var onlyEven = R.filter(even);
    eq(onlyEven([1, 2, 3, 4, 5, 6, 7]), [2, 4, 6]);
  });

});


describe('Immutable: filter', function() {
  var even = function(x) {return x % 2 === 0;};

  it('reduces an array to those matching a filter', function() {
    eq(R.filter(even, I.List([1, 2, 3, 4, 5])), I.List([2, 4]));
  });

  it('returns an empty array if no element matches', function() {
    eq(R.filter(function(x) { return x > 100; }, I.List([1, 9, 99])), I.List());
  });

  it('returns an empty array if asked to filter an empty array', function() {
    eq(R.filter(function(x) { return x > 100; }, I.List()), I.List());
  });

  it('filters objects', function() {
    var positive = function(x) { return x > 0; };
    eq(R.filter(positive, {}), {});
    eq(R.filter(positive, {x: 0, y: 0, z: 0}), {});
    eq(R.filter(positive, {x: 1, y: 0, z: 0}), {x: 1});
    eq(R.filter(positive, {x: 1, y: 2, z: 0}), {x: 1, y: 2});
    eq(R.filter(positive, {x: 1, y: 2, z: 3}), {x: 1, y: 2, z: 3});
  });

  it('dispatches to passed-in non-Array object with a `filter` method', function() {
    var f = {filter: function(f) { return f('called f.filter'); }};
    eq(R.filter(function(s) { return s; }, f), 'called f.filter');
  });

  it('is curried', function() {
    var onlyEven = R.filter(even);
    eq(onlyEven(I.List([1, 2, 3, 4, 5, 6, 7])), I.List([2, 4, 6]));
  });

});

var assert = require('assert');

var R = require('..');
var eq = require('./shared/eq');
var I = require('immutable');

describe('flatten', function() {
  it('turns a nested list into one flat list', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    eq(R.flatten(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
    eq(R.flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
    eq(R.flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
  });

  it('is not destructive', function() {
    var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
    assert.notStrictEqual(R.flatten(nest), nest);
  });

  it('handles ridiculously large inputs', function() {
    this.timeout(10000);
    eq(R.flatten([new Array(1000000), R.range(0, 56000), 5, 1, 3]).length, 1056003);
  });

  it('handles array-like objects', function() {
    var o = {length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']]};
    eq(R.flatten(o), [1, 2, 3, 'a', 'b', 'c', 'd', 'e']);
  });

  it('flattens an array of empty arrays', function() {
    eq(R.flatten([[], [], []]), []);
    eq(R.flatten([]), []);
  });

});


describe('Immutable: flatten', function() {
  it('turns a nested list into one flat list', function() {
    var nest = I.List([1, I.List([2]), I.List([3, I.List([4, 5]), 6, I.List([[[7], 8]])]), 9, 10]);
    eq(R.flatten(nest), I.List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    nest = I.List([I.List([I.List([I.List([3])]), 2, 1]), 0, [[-1, -2], -3]]);
    eq(R.flatten(nest), I.List([3, 2, 1, 0, -1, -2, -3]));
    eq(R.flatten(I.List([1, 2, 3, 4, 5])), I.List([1, 2, 3, 4, 5]));
  });


  it('handles ridiculously large inputs', function() {
    this.timeout(10000);
    eq(R.flatten(I.List([I.Range(0, 1000000), I.List(R.range(0, 56000)), 5, 1, 3])).size, 1056003);
  });

  it('handles array-like objects', function() {
    var o = {length: 3, 0: I.List([1, 2, I.List([3])]), 1: I.List(), 2: I.List(['a', 'b', 'c', I.List(['d', 'e'])])};
    eq(R.flatten(o), I.List([1, 2, 3, 'a', 'b', 'c', 'd', 'e']));
  });

  it('flattens an array of empty arrays', function() {
    eq(R.flatten(I.List([I.List(), I.List(), I.List()])), I.List());
    eq(R.flatten(I.List()), I.List());
  });

});

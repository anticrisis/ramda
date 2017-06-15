var listXf = require('./helpers/listXf');

var R = require('..');
var eq = require('./shared/eq');
var Id = require('./shared/Id');
var I = require('immutable');

describe('map', function() {
  var times2 = function(x) {return x * 2;};
  var add1 = function(x) {return x + 1;};
  var dec = function(x) { return x - 1; };
  var intoArray = R.into([]);

  it('maps simple functions over arrays', function() {
    eq(R.map(times2, [1, 2, 3, 4]), [2, 4, 6, 8]);
  });

  it('maps simple functions into arrays', function() {
    eq(intoArray(R.map(times2), [1, 2, 3, 4]), [2, 4, 6, 8]);
  });

  it('maps over objects', function() {
    eq(R.map(dec, {}), {});
    eq(R.map(dec, {x: 4, y: 5, z: 6}), {x: 3, y: 4, z: 5});
  });

  it('interprets ((->) r) as a functor', function() {
    var f = function(a) { return a - 1; };
    var g = function(b) { return b * 2; };
    var h = R.map(f, g);
    eq(h(10), (10 * 2) - 1);
  });

  it('dispatches to objects that implement `map`', function() {
    var obj = {x: 100, map: function(f) { return f(this.x); }};
    eq(R.map(add1, obj), 101);
  });

  it('dispatches to transformer objects', function() {
    eq(R.map(add1, listXf), {
      f: add1,
      xf: listXf
    });
  });

  it('composes', function() {
    var mdouble = R.map(times2);
    var mdec = R.map(dec);
    eq(mdec(mdouble([10, 20, 30])), [19, 39, 59]);
  });

  it('can compose transducer-style', function() {
    var mdouble = R.map(times2);
    var mdec = R.map(dec);
    var xcomp = mdec(mdouble(listXf));
    eq(xcomp.xf, {xf: listXf, f: times2});
    eq(xcomp.f, dec);
  });

  it('is curried', function() {
    var inc = R.map(add1);
    eq(inc([1, 2, 3]), [2, 3, 4]);
  });

  it('correctly reports the arity of curried versions', function() {
    var inc = R.map(add1);
    eq(inc.length, 1);
  });

  it('correctly uses fantasy-land implementations', function() {

    var m1 = Id(1);
    var m2 = R.map(R.add(1), m1);

    eq(m1.value + 1, m2.value);
  });

});


describe('Immutable: map', function() {
  var times2 = function(x) {return x * 2;};
  var add1 = function(x) {return x + 1;};
  var dec = function(x) { return x - 1; };
  var intoArray = R.into(I.List());

  it('maps simple functions over arrays', function() {
    eq(R.map(times2, I.List([1, 2, 3, 4])), I.List([2, 4, 6, 8]));
  });

  it('maps simple functions into arrays', function() {
    eq(intoArray(R.map(times2), I.List([1, 2, 3, 4])), I.List([2, 4, 6, 8]));
  });

  it('maps over objects', function() {
    eq(R.map(dec, I.Map({})), I.Map());
    eq(R.map(dec, I.Map({x: 4, y: 5, z: 6})), I.Map({x: 3, y: 4, z: 5}));
  });

  it('interprets ((->) r) as a functor', function() {
    var f = function(a) { return a - 1; };
    var g = function(b) { return b * 2; };
    var h = R.map(f, g);
    eq(h(10), (10 * 2) - 1);
  });

  it('dispatches to objects that implement `map`', function() {
    var obj = I.Map({x: 100, map: function(f) { return f(this.get('x')); }});
    eq(R.map(add1, obj), 101);
  });

  it('dispatches to transformer objects', function() {
    eq(R.map(add1, listXf), {
      f: add1,
      xf: listXf
    });
  });

  it('composes', function() {
    var mdouble = R.map(times2);
    var mdec = R.map(dec);
    eq(mdec(mdouble(I.List([10, 20, 30]))), I.List([19, 39, 59]));
  });

  it('can compose transducer-style', function() {
    var mdouble = R.map(times2);
    var mdec = R.map(dec);
    var xcomp = mdec(mdouble(listXf));
    eq(xcomp.xf, {xf: listXf, f: times2});
    eq(xcomp.f, dec);
  });

  it('is curried', function() {
    var inc = R.map(add1);
    eq(inc(I.List([1, 2, 3])), I.List([2, 3, 4]));
  });

  it('correctly reports the arity of curried versions', function() {
    var inc = R.map(add1);
    eq(inc.length, 1);
  });

  it('correctly uses fantasy-land implementations', function() {

    var m1 = Id(1);
    var m2 = R.map(R.add(1), m1);

    eq(m1.value + 1, m2.value);
  });

});

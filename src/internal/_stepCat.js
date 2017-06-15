var _assign = require('./_assign');
var _identity = require('./_identity');
var _isArrayLike = require('./_isArrayLike');
var _isTransformer = require('./_isTransformer');
var objOf = require('../objOf');
var I = require('immutable');

module.exports = (function() {
  var _stepCatArray = {
    '@@transducer/init': Array,
    '@@transducer/step': function(xs, x) {
      xs.push(x);
      return xs;
    },
    '@@transducer/result': _identity
  };
  var _stepCatImmutableList = {
    '@@transducer/init': I.List,
    '@@transducer/step': function(xs, x) {
      return xs.push(x);
    },
    '@@transducer/result': _identity
  };
  var _stepCatString = {
    '@@transducer/init': String,
    '@@transducer/step': function(a, b) { return a + b; },
    '@@transducer/result': _identity
  };
  var _stepCatObject = {
    '@@transducer/init': Object,
    '@@transducer/step': function(result, input) {
      return _assign(
        result,
        _isArrayLike(input) ? objOf(input[0], input[1]) : input
      );
    },
    '@@transducer/result': _identity
  };
  var _stepCatImmutableMap = {
    '@@transducer/init': I.Map,
    '@@transducer/step': function(result, input) {
      return result.merge(
        _isArrayLike(input) ? objOf(input[0], input[1]) : input
      );
    },
    '@@transducer/result': _identity
  };

  return function _stepCat(obj) {
    if (I.isIndexed(obj)) {
      return _stepCatImmutableList;
    }
    if (I.isKeyed(obj)) {
      return _stepCatImmutableMap;
    }
    if (_isTransformer(obj)) {
      return obj;
    }
    if (_isArrayLike(obj)) {
      return _stepCatArray;
    }
    if (typeof obj === 'string') {
      return _stepCatString;
    }
    if (typeof obj === 'object') {
      return _stepCatObject;
    }
    throw new Error('Cannot create transformer for ' + obj);
  };
}());

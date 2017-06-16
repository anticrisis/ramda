var _isArrayLike = require('./_isArrayLike');
var I = require('immutable');
var _concat = require('./_concat');

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */

function size(list) {
  return I.isIndexed(list) ? list.size : list.length;
}

function newlist(like) {
  return I.isIndexed(like) ? I.List() : [];
}

function getitem(list, idx) {
  return I.isIndexed(list) ? list.get(idx) : list[idx];
}

function setitem(list, idx, val) {
  return I.isIndexed(list) ? list.set(idx, val) : ((list[idx] = val), list);
}

module.exports = function _makeFlat(recursive) {
  return function flatt(list) {
    var result = newlist(list);
    var sz = size(list);
    var idx = 0;
    var value;
    while (idx < sz) {
      value = getitem(list, idx);
      if (I.isIndexed(value) || _isArrayLike(value)) {
        value = recursive ? flatt(value) : value;
        result = _concat(result, value);
      } else {
        result = setitem(result, size(result), value);
      }
      idx += 1;
    }
    return result;
  };
};

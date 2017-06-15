/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
var I = require('immutable');

module.exports = function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  if (I.isIndexed(set1) || I.isIndexed(set2) ||
      I.isIndexed(set1[0]) || I.isIndexed(set2[0])) {
    return I.List().concat(I.List(set1), I.List(set2));
  } else {
    var idx;
    var len1 = set1.length;
    var len2 = set2.length;
    var result = [];

    idx = 0;
    while (idx < len1) {
      result[result.length] = set1[idx];
      idx += 1;
    }
    idx = 0;
    while (idx < len2) {
      result[result.length] = set2[idx];
      idx += 1;
    }
    return result;
  }
};

var I = require('immutable');

module.exports = function _filter(fn, list) {
  var idx = 0;
  if (I.isIndexed(list)) {
    return list.filter(fn);
  } else {
    var len = list.length;
    var result = [];

    while (idx < len) {
      if (fn(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  }
};

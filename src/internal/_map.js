var I = require('immutable');

module.exports = function _map(fn, functor) {
  var idx = 0;

  if (I.isIndexed(functor)) {
    return functor.map(fn);
  } else {
    var len = functor.length;
    var result = Array(len);
    while (idx < len) {
      result[idx] = fn(functor[idx]);
      idx += 1;
    }
    return result;
  }
};

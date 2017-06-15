var I = require('immutable');

module.exports = function _map(fn, functor) {
  var idx = 0;

  if (I.isIndexed(functor)) {
    var len = functor.size;
    return I.List(Array(len)).withMutations((a) => {
      while (idx < len) {
        a.set(idx, fn(functor.get(idx)));
        idx += 1;
      }
    });
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

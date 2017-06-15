var I = require('immutable');

module.exports = function _aperture(n, list) {
  var idx = 0;
  if (I.isIndexed(list)) {
    var limit = list.size - (n - 1);
    var accI =  I.List(new Array(limit >= 0 ? limit : 0)).withMutations((l) => {
      while (idx < limit) {
        l.set(idx, list.slice(idx, idx + n));
        idx += 1;
      }
    }
    );
    return accI;
  } else {
    var limit = list.length - (n - 1);
    var acc = new Array(limit >= 0 ? limit : 0);
    while (idx < limit) {
      acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
      idx += 1;
    }
    return acc;
  }
};

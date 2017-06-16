var I = require('immutable');

module.exports = function _has(prop, obj) {
  if (I.isKeyed(obj)) {
    return obj.has(prop);
  }
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

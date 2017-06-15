var _concat = require('./_concat');
var _curry2 = require('./_curry2');
var _xfBase = require('./_xfBase');
var I = require('immutable');


module.exports = (function() {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    if (this.xf['@@transducer/init'] === I.List) {
      this.acc = I.List(new Array(n));
    } else {
      this.acc = new Array(n);
    }
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function(result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function(result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function(input) {
    if (I.isIndexed(this.acc)) {
      this.acc = this.acc.set(this.pos, input);
      this.pos += 1;
      if (this.pos === this.acc.size) {
        this.pos = 0;
        this.full = true;
      }

    } else {
      this.acc[this.pos] = input;
      this.pos += 1;
      if (this.pos === this.acc.length) {
        this.pos = 0;
        this.full = true;
      }
    }
  };
  XAperture.prototype.getCopy = function() {
    if (I.isIndexed(this.acc)) {
      return _concat(this.acc.slice(this.pos),
                     this.acc.slice(0, this.pos));
    } else {
      return _concat(Array.prototype.slice.call(this.acc, this.pos),
                    Array.prototype.slice.call(this.acc, 0, this.pos));
    }
  };

  return _curry2(function _xaperture(n, xf) { return new XAperture(n, xf); });
}());

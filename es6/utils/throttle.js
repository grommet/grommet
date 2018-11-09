var _this = this;

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
export var throttle = function throttle(fn, threshhold, scope) {
  if (threshhold === void 0) {
    threshhold = 250;
  }

  if (scope === void 0) {
    scope = _this;
  }

  var last;
  var deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = Date.now();

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(scope, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(scope, args);
    }
  };
};
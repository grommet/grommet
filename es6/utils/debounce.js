var _this = this;

export var debounce = function debounce(cb, timer) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = _this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return cb.apply(context, args);
    }, timer);
  };
};
export var debounceDelay = function debounceDelay(_ref) {
  var theme = _ref.theme;
  return theme.global.debounceDelay;
};
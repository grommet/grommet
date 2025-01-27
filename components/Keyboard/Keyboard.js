"use strict";

exports.__esModule = true;
exports.Keyboard = void 0;
var _react = require("react");
var _propTypes = require("./propTypes");
var _excluded = ["capture", "target", "children", "onKeyDown"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var KEYS = {
  8: 'onBackspace',
  9: 'onTab',
  13: 'onEnter',
  27: 'onEsc',
  32: 'onSpace',
  37: 'onLeft',
  38: 'onUp',
  39: 'onRight',
  40: 'onDown',
  188: 'onComma',
  16: 'onShift'
};
var Keyboard = exports.Keyboard = function Keyboard(_ref) {
  var capture = _ref.capture,
    target = _ref.target,
    children = _ref.children,
    onKeyDown = _ref.onKeyDown,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var onKeyDownHandler = (0, _react.useCallback)(function (event) {
    var key = event.keyCode ? event.keyCode : event.which;
    var callbackName = KEYS[key];
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    if (callbackName && restProps[callbackName]) {
      restProps[callbackName].apply(restProps, [event].concat(rest));
    }
    if (onKeyDown) {
      onKeyDown.apply(void 0, [event].concat(rest));
    }
  }, [onKeyDown, restProps]);
  (0, _react.useEffect)(function () {
    if (target === 'document') {
      document.addEventListener('keydown', onKeyDownHandler, capture);
    }
    return function () {
      if (target === 'document') {
        document.removeEventListener('keydown', onKeyDownHandler, capture);
      }
    };
  }, [capture, onKeyDownHandler, target]);
  return target === 'document' ? children : /*#__PURE__*/(0, _react.cloneElement)(_react.Children.only(children), {
    onKeyDown: onKeyDownHandler
  });
};
Keyboard.propTypes = _propTypes.KeyboardPropTypes;
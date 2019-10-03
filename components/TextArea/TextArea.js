"use strict";

exports.__esModule = true;
exports.TextArea = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _Keyboard = require("../Keyboard");

var _hocs = require("../hocs");

var _StyledTextArea = require("./StyledTextArea");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TextArea = function TextArea(_ref) {
  var fill = _ref.fill,
      forwardRef = _ref.forwardRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["fill", "forwardRef"]);

  var onEsc = function onEsc(event) {
    // we have to stop both synthetic events and native events
    // drop and layer should not close by pressing esc on this input
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return _react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: onEsc
  }, _react["default"].createElement(_StyledTextArea.StyledTextArea, _extends({
    ref: forwardRef,
    fillArg: fill
  }, rest)));
};

var TextAreaDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TextAreaDoc = require('./doc').doc(TextArea);
}

var TextAreaWrapper = (0, _recompose.compose)((0, _hocs.withFocus)({
  focusWithMouse: true
}), _hocs.withForwardRef)(TextAreaDoc || TextArea);
exports.TextArea = TextAreaWrapper;
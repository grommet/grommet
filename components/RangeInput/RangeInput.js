"use strict";

exports.__esModule = true;
exports.RangeInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _StyledRangeInput = require("./StyledRangeInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RangeInput = function RangeInput(_ref) {
  var forwardRef = _ref.forwardRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["forwardRef"]);

  return _react["default"].createElement(_StyledRangeInput.StyledRangeInput, _extends({}, rest, {
    ref: forwardRef,
    type: "range"
  }));
};

var RangeInputDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RangeInputDoc = require('./doc').doc(RangeInput);
}

var RangeInputWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _hocs.withForwardRef)(RangeInputDoc || RangeInput);
exports.RangeInput = RangeInputWrapper;
"use strict";

exports.__esModule = true;
exports.ArrowDown = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ArrowDown = function ArrowDown(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", _extends({
    width: "10",
    height: "20",
    fill: "rgba(0, 0, 0, 0.54)"
  }, props), /*#__PURE__*/_react["default"].createElement("path", {
    d: "m0,7.5l5,5l5,-5l-10,0z"
  }));
};

exports.ArrowDown = ArrowDown;
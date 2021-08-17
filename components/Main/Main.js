"use strict";

exports.__esModule = true;
exports.Main = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = require("../Box");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Main = function Main(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    as: "main",
    fill: "vertical",
    flex: "grow",
    overflow: "auto"
  }, rest));
};

exports.Main = Main;
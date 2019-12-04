"use strict";

exports.__esModule = true;
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = require("../Box");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = function Header(_ref) {
  var children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return _react["default"].createElement(_Box.Box, _extends({
    align: "center",
    as: "header",
    direction: "row",
    flex: false,
    justify: "between",
    gap: "medium"
  }, rest));
};

var HeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  HeaderDoc = require('./doc').doc(Header);
}

var HeaderWrapper = HeaderDoc || Header;
exports.Header = HeaderWrapper;
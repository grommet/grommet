"use strict";

exports.__esModule = true;
exports["default"] = exports.DoubleFooter = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyledAnchor = (0, _styledComponents["default"])(_grommet.Anchor).withConfig({
  displayName: "DoubleFooter__StyledAnchor",
  componentId: "hzr4m1-0"
})(["font-weight:200;"]);

var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(StyledAnchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};

var FooterContent = function FooterContent() {
  return _data.fiveColumns.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium",
      key: item[0]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "small"
    }, item[0]), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, [1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/_react["default"].createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

var DoubleFooter = function DoubleFooter() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
    background: "dark-1",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(FooterContent, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
    background: "dark-2",
    pad: {
      horizontal: 'large',
      vertical: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
    color: "brand"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    alignSelf: "center"
  }, "grommet.io")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright")));
};

exports.DoubleFooter = DoubleFooter;
DoubleFooter.storyName = 'Double footer';
var _default = {
  title: 'Layout/Footer/Double footer'
};
exports["default"] = _default;
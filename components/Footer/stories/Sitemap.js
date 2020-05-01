"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};

var FooterContent = function FooterContent() {
  return _data.threeColumns.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium",
      key: item[0]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "small"
    }, item[0]), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, [1, 2, 3].map(function (i) {
      return /*#__PURE__*/_react["default"].createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

var Sitemap = function Sitemap() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    gap: "large",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
    background: "dark-1",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
    color: "brand",
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    alignSelf: "center",
    color: "brand",
    weight: "bold"
  }, "grommet.io"))), /*#__PURE__*/_react["default"].createElement(FooterContent, null)));
};

(0, _react2.storiesOf)('Footer', module).add('Sitemap', function () {
  return /*#__PURE__*/_react["default"].createElement(Sitemap, null);
});
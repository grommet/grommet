"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

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

  return _react["default"].createElement(StyledAnchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};

var FooterContent = function FooterContent() {
  return _data.fiveColumns.map(function (item) {
    return _react["default"].createElement(_grommet.Box, {
      gap: "medium",
      key: item[0]
    }, _react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "small"
    }, item[0]), _react["default"].createElement(_grommet.Box, null, [1, 2, 3, 4].map(function (i) {
      return _react["default"].createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};

var DoubleFooter = function DoubleFooter() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react["default"].createElement(_grommet.Main, {
    background: "light-4",
    elevation: "large",
    pad: "large",
    border: true
  }, _react["default"].createElement(_grommet.Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), _react["default"].createElement(_grommet.Box, {
    flex: true
  })), _react["default"].createElement(_grommet.Footer, {
    background: "dark-1",
    pad: "large"
  }, _react["default"].createElement(FooterContent, null)), _react["default"].createElement(_grommet.Footer, {
    background: "dark-2",
    pad: {
      horizontal: 'large',
      vertical: 'small'
    }
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small"
  }, _react["default"].createElement(_grommetIcons.Grommet, {
    color: "brand"
  }), _react["default"].createElement(_grommet.Text, {
    alignSelf: "center"
  }, "grommet.io")), _react["default"].createElement(_grommet.Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright")));
};

(0, _react2.storiesOf)('Footer', module).add('DoubleFooter', function () {
  return _react["default"].createElement(DoubleFooter, null);
});
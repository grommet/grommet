"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UncontrolledTabs = function UncontrolledTabs(_ref) {
  var _ref$plain = _ref.plain,
      plain = _ref$plain === void 0 ? false : _ref$plain;
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, _react["default"].createElement(_grommet.Box, {
    fill: true
  }, _react["default"].createElement(_grommet.Tabs, {
    flex: true
  }, _react["default"].createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 1"
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 2"
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    plain: plain,
    title: "Tab 3"
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))))));
};

UncontrolledTabs.propTypes = {
  plain: _propTypes["default"].bool // eslint-disable-line react/require-default-props

};
(0, _react2.storiesOf)('Tabs', module).add('Uncontrolled', function () {
  return _react["default"].createElement(UncontrolledTabs, null);
}).add('Plain', function () {
  return _react["default"].createElement(UncontrolledTabs, {
    plain: true
  });
});
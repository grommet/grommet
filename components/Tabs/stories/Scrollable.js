"use strict";

exports.__esModule = true;
exports["default"] = exports.Scrollable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScrollableTabs = function ScrollableTabs() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 1"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      overflow: "auto",
      pad: "xlarge",
      align: "center",
      background: "accent-1"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, "hello!"))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 2"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "accent-2"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))))) // </Grommet>

  );
};

var Scrollable = function Scrollable() {
  return /*#__PURE__*/_react["default"].createElement(ScrollableTabs, null);
};

exports.Scrollable = Scrollable;
Scrollable.args = {
  full: true
};
var _default = {
  title: 'Controls/Tabs/Scrollable'
};
exports["default"] = _default;
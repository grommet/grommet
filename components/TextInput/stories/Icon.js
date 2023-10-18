"use strict";

exports.__esModule = true;
exports["default"] = exports.Icon = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Icon = exports.Icon = function Icon() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      placeholder: "search ..."
    }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      reverse: true,
      placeholder: "search ..."
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/TextInput/Icon'
};
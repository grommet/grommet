"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Search = require("grommet-icons/icons/Search");
var _Filter = require("grommet-icons/icons/Filter");
var _Toolbar = require("../Toolbar");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Toolbar is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Toolbar.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: {
        max: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null)
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
      kind: "toolbar",
      icon: /*#__PURE__*/_react["default"].createElement(_Filter.Filter, null)
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Create",
      primary: true
    }))))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Toolbar/Simple'
};
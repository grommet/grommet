"use strict";

exports.__esModule = true;
exports["default"] = exports.ScrollBodyLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScrollBodyLayer = function ScrollBodyLayer() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    full: "vertical",
    position: "right"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    style: {
      minWidth: '378px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    as: "header",
    elevation: "small",
    justify: "between"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: {
      left: 'small'
    }
  }, "Header"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, null)
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    overflow: "auto",
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body"), /*#__PURE__*/_react["default"].createElement("span", null, "body")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    as: "footer",
    border: {
      side: 'top'
    },
    pad: "small",
    justify: "end",
    direction: "row",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Save"
  })))));
};

exports.ScrollBodyLayer = ScrollBodyLayer;
ScrollBodyLayer.storyName = 'Fixed header, scroll body';
var _default = {
  title: 'Layout/Layer/Fixed header, scroll body'
};
exports["default"] = _default;
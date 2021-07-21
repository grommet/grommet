"use strict";

exports.__esModule = true;
exports["default"] = exports.Tip = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

var Tip = function Tip() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium",
    gap: "xlarge"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    truncate: "tip"
  }, alphabet)), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: 'tooltip'
    }
  }, "Tip with dropProps"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    tip: {
      plain: true,
      dropProps: {
        align: {
          bottom: 'top'
        }
      },
      content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "xxsmall",
        elevation: "small",
        background: "#EDEDED" // no opacity
        ,
        round: "xsmall",
        margin: "xsmall",
        overflow: "hidden",
        align: "center"
      }, "tooltip")
    }
  }, "Tip with content prop")));
};

exports.Tip = Tip;
Tip.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: "Type/Text/Tip"
};
exports["default"] = _default;
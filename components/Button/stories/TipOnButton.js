"use strict";

exports.__esModule = true;
exports.TipOnButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TipOnButton = function TipOnButton() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Default Tip",
    onClick: function onClick() {},
    tip: "tooltip"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Tip Drop props",
    onClick: function onClick() {},
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: 'tooltip'
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Tip content",
    onClick: function onClick() {},
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
  })));
};

exports.TipOnButton = TipOnButton;
TipOnButton.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
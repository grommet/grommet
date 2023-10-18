"use strict";

exports.__esModule = true;
exports["default"] = exports.OnClickBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var OnClickBox = exports.OnClickBox = function OnClickBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      justify: "center",
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: true,
      pad: "large",
      align: "center",
      round: true,
      gap: "small",
      hoverIndicator: {
        background: {
          color: 'background-contrast'
        },
        elevation: 'medium'
      },
      onClick: function onClick() {
        alert('clicked');
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "large"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Party")))
    // </Grommet>
  );
};

OnClickBox.storyName = 'onClick';
var _default = exports["default"] = {
  title: 'Layout/Box/onClick'
};
"use strict";

exports.__esModule = true;
exports["default"] = exports.FixedSizesBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FixedSizesBox = exports.FixedSizesBox = function FixedSizesBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "small",
      height: "small",
      round: "small",
      align: "center",
      justify: "center",
      background: "brand",
      overflow: {
        horizontal: 'hidden',
        vertical: 'scroll'
      },
      tabIndex: 0
    }, Array(20).fill().map(function (_, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_grommet.Text, {
          key: i
        }, "Small (" + i + ")")
      );
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium",
      height: "medium",
      round: "small",
      align: "center",
      justify: "center",
      background: "brand"
    }, "Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "large",
      height: "large",
      round: "small",
      align: "center",
      justify: "center",
      background: "brand"
    }, "Large"))
    // </Grommet>
  );
};

FixedSizesBox.storyName = 'Fixed sizes';
var _default = exports["default"] = {
  title: "Layout/Box/Fixed sizes"
};
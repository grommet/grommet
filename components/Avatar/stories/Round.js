"use strict";

exports.__esModule = true;
exports["default"] = exports.Round = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Round = exports.Round = function Round() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      direction: "row",
      alignContent: "center",
      gap: "small",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: false
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "small"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "large"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Avatar/Round'
};
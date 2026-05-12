"use strict";

exports.__esModule = true;
exports["default"] = exports.Round = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
      round: false,
      "aria-label": "Shimi"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "xsmall",
      "aria-label": "Shimi"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "small",
      "aria-label": "Shimi"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "medium",
      "aria-label": "Shimi"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      round: "large",
      "aria-label": "Shimi"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: src,
      "aria-label": "Shimi"
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Avatar/Round'
};
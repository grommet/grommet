"use strict";

exports.__esModule = true;
exports["default"] = exports.Basic = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Basic = exports.Basic = function Basic() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "center",
      direction: "row",
      gap: "small",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: src
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "dark-4"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Favorite, {
      color: "light-2"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "dark-2"
    }, "R"), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "brand"
    }, "SY"))
    // </Grommed>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Avatar/Basic'
};
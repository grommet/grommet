"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomDefaultProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _grommet.extendDefaultTheme)((0, _utils.deepMerge)(_themes.base, {
  global: {
    colors: {
      brand: 'red'
    }
  }
}));

var CustomDefaultProps = function CustomDefaultProps() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "brand",
    pad: "small"
  }, "Hello");
};

exports.CustomDefaultProps = CustomDefaultProps;
CustomDefaultProps.storyName = 'Extend default';
var _default = {
  title: 'Utilities/Theme/Extend default'
};
exports["default"] = _default;
"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];

var All = function All() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, sizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: size
    }, "Text " + size));
  }));
};

(0, _react2.storiesOf)('Text', module).add('All', function () {
  return /*#__PURE__*/_react["default"].createElement(All, null);
});
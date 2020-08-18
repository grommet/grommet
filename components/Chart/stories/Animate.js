"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var values = [{
  value: [10, 20]
}, {
  value: [20, 30]
}, {
  value: [30, 15]
}];

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    wrap: true,
    pad: "large"
  }, ['bar', 'line', 'area', 'point'].map(function (type) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: type,
      margin: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      size: "small",
      textAlign: "center"
    }, type), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: type,
      values: values,
      animate: true
    }));
  })));
};

(0, _react2.storiesOf)('Chart', module).add('Animate', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
}, {
  chromatic: {
    disable: true
  }
});
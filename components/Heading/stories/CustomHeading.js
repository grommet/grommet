"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customlevel = (0, _utils.deepMerge)(_themes.grommet, {
  heading: {
    level: {
      5: {
        small: {
          size: '12px',
          height: '16px'
        },
        medium: {
          size: '14px',
          height: '18px'
        },
        large: {
          size: '16px',
          height: '20px'
        }
      }
    },
    extend: function extend(props) {
      return "color: " + props.theme.global.colors.brand;
    }
  }
});

var CustomHeading = function CustomHeading() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customlevel
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 5,
    size: "small"
  }, "Heading level 5 small"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 5,
    size: "medium"
  }, "Heading level 5 small"), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 5,
    size: "large"
  }, "Heading level 5 small"));
};

(0, _react2.storiesOf)('Heading', module).add('Custom', function () {
  return /*#__PURE__*/_react["default"].createElement(CustomHeading, null);
});
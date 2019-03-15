"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customTheme = {
  global: {
    font: {
      family: 'Arial'
    }
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3'
    },
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    primary: {
      color: '#2196f3'
    },
    extend: function extend(props) {
      var extraStyles = '';

      if (props.primary) {
        extraStyles = "\n            text-transform: uppercase;\n          ";
      }

      return "\n          color: white;\n          font-size: 12px;\n          font-weight: bold;\n  \n          " + extraStyles + "\n        ";
    }
  }
};

var CustomTheme = function CustomTheme() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Button, {
    label: "custom theme",
    onClick: function onClick() {},
    primary: true
  }))), _react.default.createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Button, {
    as: "span",
    label: "Custom as=span",
    path: "/"
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Custom', function () {
  return _react.default.createElement(CustomTheme, null);
});
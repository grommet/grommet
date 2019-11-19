"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customFocus = (0, _utils.deepMerge)(_grommet.grommet, {
  global: {
    colors: {
      focus: 'neutral-3'
    }
  }
});

var CustomDefaultProps = function CustomDefaultProps() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: customFocus
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "medium",
    width: "medium"
  }, _react["default"].createElement(_grommet.Text, null, "Focus on the input components and notice the custom focus color"), _react["default"].createElement(_grommet.TextInput, {
    placeholder: "hi"
  }), _react["default"].createElement(_grommet.Anchor, {
    href: ""
  }, "Anchor"), _react["default"].createElement(_grommet.Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {}
    }, {
      label: 'Two'
    }]
  }), _react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  })));
};

(0, _react2.storiesOf)('Theme', module).add('Focus', function () {
  return _react["default"].createElement(CustomDefaultProps, null);
});
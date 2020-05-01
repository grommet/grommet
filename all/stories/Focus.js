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
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customFocus
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "medium",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Focus on the input components and notice the custom focus color"), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    placeholder: "hi"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: ""
  }, "Anchor"), /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {}
    }, {
      label: 'Two'
    }]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  })));
};

(0, _react2.storiesOf)('Theme', module).add('Focus', function () {
  return /*#__PURE__*/_react["default"].createElement(CustomDefaultProps, null);
});
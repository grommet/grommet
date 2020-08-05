"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_grommet.grommet, {
  formField: {
    border: {
      side: 'all'
    },
    content: {
      pad: 'large',
      margin: 'medium'
    },
    error: {
      size: 'xsmall'
    },
    help: {
      size: 'xsmall'
    },
    info: {
      size: 'xsmall'
    },
    label: {
      size: 'small'
    },
    round: '4px'
  },
  global: {
    font: {
      size: 'small'
    }
  }
});

var Themed = function Themed() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    pad: {
      horizontal: 'medium'
    },
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Styling FormField content container with ContentProps"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "ContentProps will override any settings applied in your theme."), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information",
    contentProps: {
      background: 'lightblue',
      border: {
        color: 'blue',
        size: 'small'
      },
      pad: 'medium',
      overflow: 'auto'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    pad: {
      horizontal: 'medium'
    },
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "ContentProps + Disabled State"), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example2-id",
    name: "example2",
    label: "Field Label",
    help: "Some helpful descriptive text",
    contentProps: {
      background: 'lightblue',
      border: {
        color: 'blue',
        size: 'small'
      },
      pad: 'medium',
      overflow: 'auto'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt",
    disabled: true
  }))))));
};

(0, _react2.storiesOf)('Form', module).add('Themed', function () {
  return /*#__PURE__*/_react["default"].createElement(Themed, null);
});
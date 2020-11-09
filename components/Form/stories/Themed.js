"use strict";

exports.__esModule = true;
exports.Themed = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = require("styled-components");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  formField: {
    border: {
      side: 'all'
    },
    content: {
      pad: 'large',
      margin: 'medium'
    },
    error: {
      container: {
        background: 'black',
        pad: {
          horizontal: 'small'
        },
        extend: (0, _styledComponents.css)(["svg{margin-top:10px;}"])
      },
      color: 'white',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Alert, {
        size: "small"
      }),
      size: 'xsmall'
    },
    help: {
      size: 'xsmall'
    },
    info: {
      size: 'xsmall',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusInfo, {
        size: "small"
      }),
      container: {
        align: 'center',
        background: 'dark-1',
        pad: {
          horizontal: 'small'
        },
        margin: {
          top: 'small'
        }
      }
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
    error: "Message to show on error. This is a long message to\n              demonstrate custom svg alignment.",
    info: "Here is some additional information that should give the\n              user better context on how to properly complete the FormField.",
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

exports.Themed = Themed;
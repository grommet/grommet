"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldSpacingOptions = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
var _utils = require("grommet/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  formField: {
    border: {
      side: 'all'
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
var adjustedLabelMargins = {
  error: {
    margin: 'none'
  },
  help: {
    margin: 'none'
  },
  info: {
    margin: 'none'
  },
  label: {
    margin: 'none'
  }
};
var FieldSpacingOptions = exports.FieldSpacingOptions = function FieldSpacingOptions() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: {
      count: 'fit',
      size: 'medium'
    },
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Default Spacing"), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "radiobutton2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "radiobutton2-id",
    name: "example2",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Label & Message Margins Removed"), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      formField: adjustedLabelMargins
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput3-id",
    name: "example3",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput3-id",
    name: "example3",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "radiobutton4-id",
    name: "example4",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "radiobutton4-id",
    name: "example4",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Field Margin Increased"), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      formField: _extends({
        margin: {
          bottom: 'large'
        }
      }, adjustedLabelMargins)
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput5-id",
    name: "example5",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput5-id",
    name: "example5",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "radiobutton6-id",
    name: "example6",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "radiobutton6-id",
    name: "example6",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Content Margin Added"), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      formField: _extends({
        content: {
          margin: {
            top: 'medium',
            bottom: 'small'
          }
        }
      }, adjustedLabelMargins)
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput7-id",
    name: "example7",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput7-id",
    name: "example7",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "radiobutton8-id",
    name: "example8",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "radiobutton8-id",
    name: "example8",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "xsmall"
  }, "Content Pad Increased"), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: {
      formField: _extends({
        content: {
          pad: 'medium'
        }
      }, adjustedLabelMargins)
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput9-id",
    name: "example9",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information",
    pad: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput9-id",
    name: "example9",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "radiobutton10-id",
    name: "example10",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "radiobutton10-id",
    name: "example10",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))))));
};
FieldSpacingOptions.storyName = 'Field spacing options';
var _default = exports["default"] = {
  title: 'Input/Form/Custom Themed/Field spacing options'
};
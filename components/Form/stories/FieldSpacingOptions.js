"use strict";

exports.__esModule = true;
exports.FieldSpacingOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var FieldSpacingOptions = function FieldSpacingOptions() {
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
    htmlFor: "example1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "example2-id",
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
    htmlFor: "example1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "example2-id",
    name: "example2",
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
    htmlFor: "example11-id",
    name: "example11",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example11-id",
    name: "example11",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example21-id",
    name: "example21",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "example21-id",
    name: "example21",
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
    htmlFor: "example12-id",
    name: "example12",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example12-id",
    name: "example12",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example22-id",
    name: "example22",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "example22-id",
    name: "example22",
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
    htmlFor: "example13-id",
    name: "example13",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information",
    pad: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "example13-id",
    name: "example13",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "example23-id",
    name: "example23",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "example23-id",
    name: "example23",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))))));
};

exports.FieldSpacingOptions = FieldSpacingOptions;
FieldSpacingOptions.story = {
  name: 'Field spacing options'
};
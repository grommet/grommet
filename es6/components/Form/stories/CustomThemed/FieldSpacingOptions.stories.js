function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Box, Form, FormField, Grid, Grommet, Heading, RadioButtonGroup, TextInput, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
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
export var FieldSpacingOptions = function FieldSpacingOptions() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: {
      count: 'fit',
      size: 'medium'
    },
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Default Spacing"), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "radiobutton2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "radiobutton2-id",
    name: "example2",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Label & Message Margins Removed"), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      formField: adjustedLabelMargins
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput3-id",
    name: "example3",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput3-id",
    name: "example3",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "radiobutton4-id",
    name: "example4",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "radiobutton4-id",
    name: "example4",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Field Margin Increased"), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      formField: _extends({
        margin: {
          bottom: 'large'
        }
      }, adjustedLabelMargins)
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput5-id",
    name: "example5",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput5-id",
    name: "example5",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "radiobutton6-id",
    name: "example6",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "radiobutton6-id",
    name: "example6",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Content Margin Added"), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
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
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput7-id",
    name: "example7",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput7-id",
    name: "example7",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "radiobutton8-id",
    name: "example8",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "radiobutton8-id",
    name: "example8",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  }))))), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Content Pad Increased"), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      formField: _extends({
        content: {
          pad: 'medium'
        }
      }, adjustedLabelMargins)
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput9-id",
    name: "example9",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information",
    pad: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput9-id",
    name: "example9",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "radiobutton10-id",
    name: "example10",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "radiobutton10-id",
    name: "example10",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))))));
};
FieldSpacingOptions.storyName = 'Field spacing options';
export default {
  title: 'Input/Form/Custom Themed/Field spacing options'
};
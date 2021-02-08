function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    htmlFor: "example1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "example2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "example2-id",
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
    htmlFor: "example1-id",
    name: "example1",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "example2-id",
    name: "example2",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "example2-id",
    name: "example2",
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
    htmlFor: "example11-id",
    name: "example11",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example11-id",
    name: "example11",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "example21-id",
    name: "example21",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "example21-id",
    name: "example21",
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
    htmlFor: "example12-id",
    name: "example12",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example12-id",
    name: "example12",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "example22-id",
    name: "example22",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "example22-id",
    name: "example22",
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
    htmlFor: "example13-id",
    name: "example13",
    label: "Field Label",
    help: "Some helpful descriptive text",
    error: "Message to show on error",
    info: "Additional contextual information",
    pad: true
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example13-id",
    name: "example13",
    placeholder: "Placeholder input prompt"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "example23-id",
    name: "example23",
    label: "Field Label for Grouped Input",
    help: "Choose your favorite"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "example23-id",
    name: "example23",
    options: ['Eenie', 'Meenie', 'Miney', 'Moe']
  })))))));
};
FieldSpacingOptions.storyName = 'Field spacing options';
export default {
  title: 'Input/Form/Field spacing options'
};
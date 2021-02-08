import React from 'react';
import { css } from 'styled-components';
import { Alert } from "grommet-icons/es6/icons/Alert";
import { StatusInfo } from "grommet-icons/es6/icons/StatusInfo";
import { Box, Form, FormField, Grommet, Heading, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils';
var customTheme = deepMerge(grommet, {
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
        extend: css(["svg{margin-top:10px;}"])
      },
      color: 'white',
      icon: /*#__PURE__*/React.createElement(Alert, {
        size: "small"
      }),
      size: 'xsmall'
    },
    help: {
      size: 'xsmall'
    },
    info: {
      size: 'xsmall',
      icon: /*#__PURE__*/React.createElement(StatusInfo, {
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
export var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    border: true,
    pad: {
      horizontal: 'medium'
    },
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "Styling FormField content container with ContentProps"), /*#__PURE__*/React.createElement(Text, null, "ContentProps will override any settings applied in your theme."), /*#__PURE__*/React.createElement(FormField, {
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
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt"
  })))), /*#__PURE__*/React.createElement(Box, {
    border: true,
    pad: {
      horizontal: 'medium'
    },
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xsmall"
  }, "ContentProps + Disabled State"), /*#__PURE__*/React.createElement(FormField, {
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
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "example1-id",
    name: "example1",
    placeholder: "Placeholder input prompt",
    disabled: true
  }))))));
};
export default {
  title: 'Input/Form/Themed'
};
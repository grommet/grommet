import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, Form, FormField, Grommet, Heading, Text, TextInput } from 'grommet';
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

storiesOf('Form', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(Themed, null);
});
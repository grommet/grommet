import React from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';
import { grommet, Anchor, Box, Button, Grommet, Menu, Text, TextInput } from 'grommet';
var customFocus = deepMerge(grommet, {
  global: {
    colors: {
      focus: 'neutral-3'
    }
  }
});

var CustomDefaultProps = function CustomDefaultProps() {
  return React.createElement(Grommet, {
    theme: customFocus
  }, React.createElement(Box, {
    pad: "small",
    gap: "medium",
    width: "medium"
  }, React.createElement(Text, null, "Focus on the input components and notice the custom focus color"), React.createElement(TextInput, {
    placeholder: "hi"
  }), React.createElement(Anchor, {
    href: ""
  }, "Anchor"), React.createElement(Menu, {
    label: "Menu",
    items: [{
      label: 'One',
      onClick: function onClick() {}
    }, {
      label: 'Two'
    }]
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  })));
};

storiesOf('Theme', module).add('Focus', function () {
  return React.createElement(CustomDefaultProps, null);
});
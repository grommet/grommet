import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Paragraph } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';
var customTheme = deepMerge(grommet, {
  paragraph: {
    font: {
      family: 'Comic Sans MS'
    }
  }
});

var All = function All() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Paragraph, null, "The font family for this paragraph is being defined by a custom theme."));
}; // disabling chromatic because snapshot doesn't capture font


storiesOf('Paragraph', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(All, null);
}, {
  chromatic: {
    disable: true
  }
});
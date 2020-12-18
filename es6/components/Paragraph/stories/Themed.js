import React from 'react';
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
export var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Paragraph, null, "The font family for this paragraph is being defined by a custom theme."));
}; // disabling chromatic because snapshot doesn't capture font

Themed.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var Color = function Color() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Text, {
    color: "accent-1"
  }, "Colored Text"));
};

storiesOf('Text', module).add('Color', function () {
  return /*#__PURE__*/React.createElement(Color, null);
});
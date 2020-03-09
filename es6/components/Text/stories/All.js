import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];

var All = function All() {
  return React.createElement(Grommet, {
    theme: grommet
  }, sizes.map(function (size) {
    return React.createElement(Box, {
      key: size,
      margin: "small"
    }, React.createElement(Text, {
      size: size
    }, "Text " + size));
  }));
};

storiesOf('Text', module).add('All', function () {
  return React.createElement(All, null);
});
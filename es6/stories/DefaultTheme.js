import React from 'react';
import { storiesOf } from '@storybook/react';
import { base } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { Box, extendDefaultTheme } from 'grommet';
extendDefaultTheme(deepMerge(base, {
  global: {
    colors: {
      brand: 'red'
    }
  }
}));

var CustomDefaultProps = function CustomDefaultProps() {
  return React.createElement(Box, {
    background: "brand",
    pad: "small"
  }, "Hello");
};

storiesOf('Components', module).add('Default Theme', function () {
  return React.createElement(CustomDefaultProps, null);
});
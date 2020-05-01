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
  return /*#__PURE__*/React.createElement(Box, {
    background: "brand",
    pad: "small"
  }, "Hello");
};

storiesOf('Theme', module).add('Extend Default', function () {
  return /*#__PURE__*/React.createElement(CustomDefaultProps, null);
});
import React from 'react';
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
export var CustomDefaultProps = function CustomDefaultProps() {
  return /*#__PURE__*/React.createElement(Box, {
    background: "brand",
    pad: "small"
  }, "Hello");
};
CustomDefaultProps.storyName = 'Extend default';
export default {
  title: 'Utilities/Theme/Extend default'
};
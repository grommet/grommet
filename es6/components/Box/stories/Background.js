import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box } from 'grommet';
import { grommet } from '../../../themes';

var BackgroundBox = function BackgroundBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), React.createElement(Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), React.createElement(Box, {
    pad: "small",
    background: {
      color: 'brand'
    },
    elevation: "large"
  }, "brand object"), React.createElement(Box, {
    pad: "small",
    background: {
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image"), React.createElement(Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image + color"), React.createElement(Box, {
    background: "dark-1",
    pad: "medium"
  }, React.createElement(Box, {
    background: "#FFFFFF08",
    pad: "small"
  }, "low opacity on dark background")), React.createElement(Box, {
    background: "light-5",
    pad: "medium"
  }, React.createElement(Box, {
    background: "#11111108",
    pad: "small"
  }, "low opacity on light background"))));
};

storiesOf('Box', module).add('Background', function () {
  return React.createElement(BackgroundBox, null);
});
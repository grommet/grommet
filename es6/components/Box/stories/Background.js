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
  }, "image + color")));
};

storiesOf('Box', module).add('Background', function () {
  return React.createElement(BackgroundBox, null);
});
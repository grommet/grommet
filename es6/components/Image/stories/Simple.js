import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }));
};

storiesOf('Image', module).add('Simple', function () {
  return React.createElement(Simple, null);
});
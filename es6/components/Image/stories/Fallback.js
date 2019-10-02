import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Fallback = function Fallback() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Image, {
    fallback: "//v2.grommet.io/assets/IMG_4245.jpg",
    src: "//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
  }));
};

storiesOf('Image', module).add('Fallback', function () {
  return React.createElement(Fallback, null);
});
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }));
};

var Fit = function Fit() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "start",
    gap: "medium"
  }, React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "contain"
  })), React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "cover"
  }))));
};

storiesOf('Image', module).add('Simple', function () {
  return React.createElement(Simple, null);
}).add('Fit', function () {
  return React.createElement(Fit, null);
});
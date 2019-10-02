import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Opacity = function Opacity() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), React.createElement(Image, {
    opacity: "strong",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, React.createElement(Image, {
    opacity: "medium",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), React.createElement(Image, {
    opacity: "weak",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, React.createElement(Image, {
    opacity: false,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), React.createElement(Image, {
    opacity: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, React.createElement(Image, {
    opacity: "0.6",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })));
};

storiesOf('Image', module).add('Opacity', function () {
  return React.createElement(Opacity, null);
});
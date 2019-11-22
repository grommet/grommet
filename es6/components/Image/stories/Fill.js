import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Image, Anchor } from 'grommet';
import { grommet } from 'grommet/themes';

var Fill = function Fill() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "start",
    gap: "small"
  }, React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, React.createElement(Anchor, {
    href: "#"
  }, React.createElement(Image, {
    fit: "cover",
    fill: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }))), React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, React.createElement(Anchor, {
    href: "#"
  }, React.createElement(Image, {
    fit: "contain",
    fill: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })))));
};

storiesOf('Image', module).add('Fill', function () {
  return React.createElement(Fill, null);
});
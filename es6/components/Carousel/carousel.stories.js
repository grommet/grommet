import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Grommet, Box, Carousel } from 'grommet';

var SimpleCarousel = function SimpleCarousel() {
  return React.createElement(Grommet, null, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Carousel, null, React.createElement(Box, {
    pad: "xlarge",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  })), React.createElement(Box, {
    pad: "xlarge",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  })), React.createElement(Box, {
    pad: "xlarge",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  })))));
};

storiesOf('Carousel', module).add('Simple Carousel', function () {
  return React.createElement(SimpleCarousel, null);
});
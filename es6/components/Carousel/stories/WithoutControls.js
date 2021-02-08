import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Grommet, Box, Carousel } from 'grommet';
export var NoControls = function NoControls() {
  return /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Carousel, {
    controls: false,
    play: 1500
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge",
    background: "accent-1"
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "xlarge"
  })), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge",
    background: "accent-2"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  })), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/React.createElement(Car, {
    size: "xlarge"
  })))));
};
NoControls.storyName = 'Without controls';
export default {
  title: 'Media/Carousel/Without controls'
};
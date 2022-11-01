import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Carousel, Text } from 'grommet';
export var Autoplay = function Autoplay() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      gap: "medium",
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "The Carousel slides will transition every 3 seconds"), /*#__PURE__*/React.createElement(Carousel, {
      controls: false,
      play: 3000
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "pink"
    }, /*#__PURE__*/React.createElement(Attraction, {
      color: "light-2",
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "purple"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      color: "light-2",
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "teal"
    }, /*#__PURE__*/React.createElement(Car, {
      color: "light-2",
      size: "xlarge"
    }))))
    // </Grommet>
  );
};

export default {
  title: 'Media/Carousel/Autoplay'
};
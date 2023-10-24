import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Carousel } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Carousel, null, /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "light-1"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "light-2"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "xlarge",
      background: "light-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    }))))
    // </Grommet>
  );
};

Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Media/Carousel/Simple'
};
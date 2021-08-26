import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Grommet, Box, Button, Carousel } from 'grommet';
export var WithClickableChild = function WithClickableChild() {
  return /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Carousel, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "medium",
    pad: "xlarge",
    background: "background-contrast",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Learn More"
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "medium",
    pad: "xlarge",
    background: "background-contrast",
    direction: "row"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Visit"
  })), /*#__PURE__*/React.createElement(Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/React.createElement(Car, {
    size: "xlarge"
  })))));
};
WithClickableChild.storyName = 'With Clickable Child';
export default {
  title: 'Media/Carousel/With Clickable Child'
};
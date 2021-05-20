import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Grommet, Box, Button, Carousel, Text } from 'grommet';
export var Controlled = function Controlled() {
  var _React$useState = React.useState(2),
      activeSlide = _React$useState[0],
      setActiveSlide = _React$useState[1];

  return /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "small",
    align: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "-",
    onClick: function onClick() {
      return setActiveSlide(activeSlide - 1);
    }
  }), /*#__PURE__*/React.createElement(Text, null, activeSlide), /*#__PURE__*/React.createElement(Button, {
    label: "+",
    onClick: function onClick() {
      return setActiveSlide(activeSlide + 1);
    }
  })), /*#__PURE__*/React.createElement(Carousel, {
    activeChild: activeSlide,
    onChild: setActiveSlide
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
Controlled.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Media/Carousel/Controlled'
};
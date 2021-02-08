import React from 'react';
import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';
export var Fit = function Fit() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, /*#__PURE__*/React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "contain"
  })), /*#__PURE__*/React.createElement(Box, {
    height: "small",
    width: "small",
    border: true
  }, /*#__PURE__*/React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    fit: "cover"
  }))));
};
export default {
  title: 'Media/Image/Fit'
};
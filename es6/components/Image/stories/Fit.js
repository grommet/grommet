import React from 'react';
import { Box, Image } from 'grommet';
export var Fit = function Fit() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "start",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      height: "small",
      width: "small",
      border: true
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      fit: "contain",
      alt: "fit contain image"
    })), /*#__PURE__*/React.createElement(Box, {
      height: "small",
      width: "small",
      border: true
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      fit: "cover",
      alt: "fit cover image"
    })))
    // </Grommet>
  );
};
export default {
  title: 'Media/Image/Fit'
};
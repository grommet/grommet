import React from 'react';
import { Box, Image } from 'grommet';
export var Opacity = function Opacity() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "default image"
    }), /*#__PURE__*/React.createElement(Image, {
      opacity: "strong",
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image strong opacity"
    })), /*#__PURE__*/React.createElement(Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/React.createElement(Image, {
      opacity: "medium",
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image medium opacity"
    }), /*#__PURE__*/React.createElement(Image, {
      opacity: "weak",
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image with weak opacity"
    })), /*#__PURE__*/React.createElement(Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/React.createElement(Image, {
      opacity: false,
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image without opacity effect"
    }), /*#__PURE__*/React.createElement(Image, {
      opacity: true,
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image with default opacity"
    })), /*#__PURE__*/React.createElement(Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/React.createElement(Image, {
      opacity: "0.6",
      src: "//v2.grommet.io/assets/IMG_4245.jpg",
      alt: "image with 60% opacity"
    })))
    // </Grommet>
  );
};
export default {
  title: 'Media/Image/Opacity'
};
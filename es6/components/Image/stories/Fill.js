import React from 'react';
import { Box, Image, Anchor } from 'grommet';
export var Fill = function Fill() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "start",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Box, {
      height: "small",
      width: "small",
      border: true
    }, /*#__PURE__*/React.createElement(Anchor, {
      href: "#"
    }, /*#__PURE__*/React.createElement(Image, {
      fit: "cover",
      fill: true,
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }))))
    // </Grommet>
  );
};

export default {
  title: 'Media/Image/Fill'
};
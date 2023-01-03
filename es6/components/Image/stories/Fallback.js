import React from 'react';
import { Image } from 'grommet';
export var Fallback = function Fallback() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Image, {
      fallback: "//v2.grommet.io/assets/IMG_4245.jpg",
      src: "//v2.grommet.io/assets/IMG_4245_not_exists.jpg",
      alt: "fallback image"
    })
    // </Grommet>
  );
};

export default {
  title: 'Media/Image/Fallback'
};
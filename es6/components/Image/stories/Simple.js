import React from 'react';
import { Image } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    })
    // </Grommet>
  );
};

export default {
  title: 'Media/Image/Simple'
};
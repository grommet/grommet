import React from 'react';
import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';
export var Fallback = function Fallback() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Image, {
    fallback: "//v2.grommet.io/assets/IMG_4245.jpg",
    src: "//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
  }));
};
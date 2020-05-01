import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Opacity = function Opacity() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), /*#__PURE__*/React.createElement(Image, {
    opacity: "strong",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Image, {
    opacity: "medium",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), /*#__PURE__*/React.createElement(Image, {
    opacity: "weak",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Image, {
    opacity: false,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }), /*#__PURE__*/React.createElement(Image, {
    opacity: true,
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Image, {
    opacity: "0.6",
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  })));
};

storiesOf('Image', module).add('Opacity', function () {
  return /*#__PURE__*/React.createElement(Opacity, null);
});
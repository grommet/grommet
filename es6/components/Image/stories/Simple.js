import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Image } from 'grommet';
import { grommet } from 'grommet/themes';

var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }));
};

storiesOf('Image', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(Simple, null);
});
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Default = function Default() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Anchor, {
    href: "#"
  }, "Link")));
};

storiesOf('Anchor', module).add('Default', function () {
  return /*#__PURE__*/React.createElement(Default, null);
});
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from '../../../themes';

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "small",
    gap: "medium"
  }, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateRight', 'rotateLeft', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (animation) {
    return /*#__PURE__*/React.createElement(Box, {
      key: animation,
      pad: "large",
      background: "brand",
      animation: {
        type: animation,
        duration: 4000
      },
      align: "center"
    }, animation);
  }))));
};

storiesOf('Box', module).add('Animation', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});
import React from 'react';
import { Box, Grid } from 'grommet';
export var Animation = function Animation() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
    })))
    // </Grommet>
  );
};

export default {
  title: 'Layout/Box/Animation'
};
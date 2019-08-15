import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Grid } from 'grommet';
import { grommet } from '../../../themes';

var RoundBox = function RoundBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small"
  }, React.createElement(Box, {
    pad: "small",
    background: "brand",
    round: true,
    alignSelf: "start"
  }, "true"), React.createElement(Grid, {
    columns: "small",
    gap: "small"
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
    return React.createElement(Box, {
      key: size,
      pad: "large",
      background: "brand",
      round: {
        size: size
      }
    }, size);
  })), React.createElement(Grid, {
    columns: "small",
    gap: "small"
  }, ['large', 'xlarge', 'full'].map(function (size) {
    return React.createElement(Box, {
      responsive: false,
      key: size,
      pad: "large",
      background: "dark-4",
      round: {
        size: size
      }
    }, size, " - Not responsive");
  })), React.createElement(Grid, {
    columns: "small",
    gap: "small"
  }, ['left', 'top', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(function (corner) {
    return React.createElement(Box, {
      key: corner,
      pad: "small",
      background: "brand",
      round: {
        corner: corner
      }
    }, corner);
  }), React.createElement(Box, {
    background: "brand",
    pad: "small",
    round: {
      corner: 'left',
      size: '15px'
    }
  }, "left rounded corner px value"))));
};

storiesOf('Box', module).add('Round', function () {
  return React.createElement(RoundBox, null);
});
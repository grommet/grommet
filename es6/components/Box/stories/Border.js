import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';

var BorderBox = function BorderBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "small",
    border: true
  }, "true"), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return React.createElement(Box, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "small",
    border: [{
      size: 'medium',
      style: 'dotted',
      side: 'top'
    }, {
      size: 'medium',
      style: 'double',
      side: 'vertical'
    }]
  }, "custom top & vertical borders")), React.createElement(Box, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return React.createElement(Box, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return React.createElement(Box, {
      key: size,
      pad: "small",
      responsive: false,
      border: {
        size: size
      }
    }, size);
  })), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return React.createElement(Box, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  })), React.createElement(Box, {
    direction: "row-responsive",
    gap: "large",
    align: "center"
  }, ['column', 'row'].map(function (direction) {
    return React.createElement(Box, {
      direction: direction,
      gap: "medium",
      border: "between"
    }, React.createElement(Text, null, "between"), React.createElement(Text, null, direction));
  }))));
};

storiesOf('Box', module).add('Border', function () {
  return React.createElement(BorderBox, null);
});
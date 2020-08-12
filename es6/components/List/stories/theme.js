import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
export var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var theme = deepMerge(grommet, {
  list: {
    item: {
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      background: ['white', 'light-2'],
      border: true
    }
  }
});

var ThemedList = function ThemedList() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(List, {
    data: locations
  })));
};

storiesOf('List', module).add('theme', function () {
  return /*#__PURE__*/React.createElement(ThemedList, null);
});
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';
import { locations } from './data';

var BasicList = function BasicList() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(List, {
    data: locations
  })));
};

storiesOf('List', module).add('basic', function () {
  return React.createElement(BasicList, null);
});
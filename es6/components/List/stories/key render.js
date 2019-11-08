import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

var RenderedList = function RenderedList() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(List, {
    data: data.slice(0, 10),
    primaryKey: function primaryKey(item) {
      return React.createElement(Text, {
        size: "large",
        weight: "bold"
      }, item.entry);
    },
    secondaryKey: function secondaryKey(item) {
      return React.createElement(Text, {
        size: "small",
        color: "dark-4"
      }, item.location);
    }
  })));
};

storiesOf('List', module).add('key render', function () {
  return React.createElement(RenderedList, null);
});
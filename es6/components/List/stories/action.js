import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, List, Menu } from 'grommet';
import { More } from "grommet-icons/es6/icons/More";
import { grommet } from 'grommet/themes';
import { data } from './data';

var ActionList = function ActionList() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "large"
  }, React.createElement(List, {
    data: data.slice(0, 10),
    pad: {
      left: 'small',
      right: 'none'
    },
    action: function action() {
      return React.createElement(Menu, {
        icon: React.createElement(More, null),
        hoverIndicator: true,
        items: [{
          label: 'one'
        }]
      });
    }
  })));
};

storiesOf('List', module).add('action', function () {
  return React.createElement(ActionList, null);
});
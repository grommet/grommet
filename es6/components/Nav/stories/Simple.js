import React from 'react';
import { storiesOf } from '@storybook/react';
import { Anchor, Grommet, Nav } from 'grommet';
import { grommet } from 'grommet/themes';
var items = [{
  label: 'Item A',
  href: '#'
}, {
  label: 'Item B',
  href: '#'
}, {
  label: 'Item C',
  href: '#'
}, {
  label: 'Item D',
  href: '#'
}];

var Simple = function Simple() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Nav, {
    pad: "large"
  }, items.map(function (item) {
    return React.createElement(Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  })));
};

storiesOf('Nav', module).add('Simple', function () {
  return React.createElement(Simple, null);
});
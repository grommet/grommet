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
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Nav, {
    pad: "large"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  })));
};

storiesOf('Nav', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(Simple, null);
});
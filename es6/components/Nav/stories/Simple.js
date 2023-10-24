import React from 'react';
import { Anchor, Nav } from 'grommet';
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
var SimpleNav = function SimpleNav() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Nav, {
      pad: "large"
    }, items.map(function (item) {
      return /*#__PURE__*/React.createElement(Anchor, {
        href: item.href,
        label: item.label,
        key: item.label
      });
    }))
    // </Grommet>
  );
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleNav, null);
};
export default {
  title: 'Controls/Nav/Simple'
};
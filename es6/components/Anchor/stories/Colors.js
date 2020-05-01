import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Colors = function Colors() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Add",
    href: "#"
  })), /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/React.createElement(Anchor, {
    label: "Add",
    href: "#"
  })));
};

storiesOf('Anchor', module).add('Colors', function () {
  return /*#__PURE__*/React.createElement(Colors, null);
});
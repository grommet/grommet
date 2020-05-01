import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Grommet, Anchor, Box } from 'grommet';
import { Add } from "grommet-icons/es6/icons/Add";
var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};

var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Add, null),
    label: "Add",
    color: "custom"
  })));
};

var Plain = function Plain() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    plain: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("p", null, "Plain Grommet"))), /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement("p", null, "Not plain Grommet"))));
};

var GrommetVars = function GrommetVars() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    cssVars: true
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    background: "var(--accent-2)",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, null, "Checkout Grommet variables, you can find them in the StyledGrommet DOM."), /*#__PURE__*/React.createElement(Box, {
    "with": true
  }, "For example, the background color in this Box is using var(--accent-2)")));
};

storiesOf('Grommet', module).add('Plain', function () {
  return /*#__PURE__*/React.createElement(Plain, null);
}).add('Theme', function () {
  return /*#__PURE__*/React.createElement(Themed, null);
}).add('Vars', function () {
  return /*#__PURE__*/React.createElement(GrommetVars, null);
});
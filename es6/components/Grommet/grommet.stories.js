import React, { Fragment } from 'react';
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
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement(Anchor, {
    icon: React.createElement(Add, null),
    label: "Add",
    color: "custom"
  })));
};

var Plain = function Plain() {
  return React.createElement(Fragment, null, React.createElement(Grommet, {
    plain: true
  }, React.createElement(Box, {
    pad: "medium"
  }, React.createElement("p", null, "Plain Grommet"))), React.createElement(Grommet, null, React.createElement(Box, {
    pad: "medium"
  }, React.createElement("p", null, "Not plain Grommet"))));
};

var GrommetVars = function GrommetVars() {
  return React.createElement(Grommet, {
    theme: grommet,
    cssVars: true
  }, React.createElement(Box, {
    pad: "medium",
    background: "var(--accent-2)",
    gap: "medium"
  }, React.createElement(Box, null, "Checkout Grommet variables, you can find them in the StyledGrommet DOM."), React.createElement(Box, {
    with: true
  }, "For example, the background color in this Box is using var(--accent-2)")));
};

storiesOf('Grommet', module).add('Plain', function () {
  return React.createElement(Plain, null);
}).add('Theme', function () {
  return React.createElement(Themed, null);
}).add('Vars', function () {
  return React.createElement(GrommetVars, null);
});
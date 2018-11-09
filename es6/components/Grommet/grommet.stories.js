import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Anchor, Box } from 'grommet';
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

storiesOf('Grommet', module).add('Theme', function () {
  return React.createElement(Themed, null);
}).add('Plain', function () {
  return React.createElement(Plain, null);
});
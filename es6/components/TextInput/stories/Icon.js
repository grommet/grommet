import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from "grommet-icons/es6/icons/Search";

var IconTextInput = function IconTextInput() {
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, React.createElement(Box, {
    width: "medium",
    gap: "medium"
  }, React.createElement(TextInput, {
    icon: React.createElement(Search, null),
    placeholder: "search ..."
  }), React.createElement(TextInput, {
    icon: React.createElement(Search, null),
    reverse: true,
    placeholder: "search ..."
  }))));
};

storiesOf('TextInput', module).add('Icon', function () {
  return React.createElement(IconTextInput, null);
});
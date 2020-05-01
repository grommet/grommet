import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { Search } from "grommet-icons/es6/icons/Search";

var IconTextInput = function IconTextInput() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(TextInput, {
    icon: /*#__PURE__*/React.createElement(Search, null),
    placeholder: "search ..."
  }), /*#__PURE__*/React.createElement(TextInput, {
    icon: /*#__PURE__*/React.createElement(Search, null),
    reverse: true,
    placeholder: "search ..."
  }))));
};

storiesOf('TextInput', module).add('Icon', function () {
  return /*#__PURE__*/React.createElement(IconTextInput, null);
});
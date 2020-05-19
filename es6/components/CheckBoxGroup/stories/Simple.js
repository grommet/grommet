import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    options: ['First', 'Second', 'Third']
  })));
};

storiesOf('CheckBoxGroup', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(Simple, null);
});
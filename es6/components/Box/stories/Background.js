import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';

var BackgroundBox = function BackgroundBox() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: {
      color: 'brand'
    },
    elevation: "large"
  }, "brand object"), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: {
      image: 'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
      opacity: 'strong'
    }
  }, "image"), /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)'
    }
  }, "image + color"), /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "#FFFFFF08",
    pad: "small"
  }, "low opacity on dark background")), /*#__PURE__*/React.createElement(Box, {
    background: "light-5",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "#11111108",
    pad: "small"
  }, "low opacity on light background")), /*#__PURE__*/React.createElement(Box, {
    background: {
      color: 'background',
      dark: true
    },
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "brand"
  }, "force dark background")), /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    background: {
      color: 'background',
      dark: false
    },
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "brand"
  }, "force light background"))), /*#__PURE__*/React.createElement(Box, {
    background: {
      color: {
        dark: 'darkgrey',
        light: 'lightgrey'
      },
      dark: true
    },
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "brand"
  }, "force dark background with color as object")), /*#__PURE__*/React.createElement(Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    background: {
      color: {
        dark: 'darkgrey',
        light: 'lightgrey'
      },
      dark: false
    },
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "brand"
  }, "force light background with color as object")))));
};

storiesOf('Box', module).add('Background', function () {
  return /*#__PURE__*/React.createElement(BackgroundBox, null);
});
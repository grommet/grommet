import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';

var ControlledTabs = function ControlledTabs() {
  var _React$useState = React.useState(),
      index = _React$useState[0],
      setIndex = _React$useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Tabs, {
    activeIndex: index,
    onActive: onActive
  }, /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 3"
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/React.createElement(Car, {
    size: "xlarge"
  })))));
};

storiesOf('Tabs', module).add('Controlled', function () {
  return /*#__PURE__*/React.createElement(ControlledTabs, null);
});
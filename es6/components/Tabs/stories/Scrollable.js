import React from 'react';
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Heading, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';

var ScrollableTabs = function ScrollableTabs() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Tabs, {
    flex: true
  }, /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    overflow: "auto",
    pad: "xlarge",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"), /*#__PURE__*/React.createElement(Heading, null, "hello!"))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  }))))));
};

export var Scrollable = function Scrollable() {
  return /*#__PURE__*/React.createElement(ScrollableTabs, null);
};
export default {
  title: 'Controls/Tabs/Scrollable'
};
import React from 'react';
import { Box, Heading, Tab, Tabs } from 'grommet';
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";

var ScrollableTabs = function ScrollableTabs() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
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
    }))))) // </Grommet>

  );
};

export var Scrollable = function Scrollable() {
  return /*#__PURE__*/React.createElement(ScrollableTabs, null);
};
Scrollable.args = {
  full: true
};
export default {
  title: 'Controls/Tabs/Scrollable'
};
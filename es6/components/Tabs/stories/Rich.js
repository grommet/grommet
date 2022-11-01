import React from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Currency } from "grommet-icons/es6/icons/Currency";
import { HomeRounded } from "grommet-icons/es6/icons/HomeRounded";
import { Notification } from "grommet-icons/es6/icons/Notification";
import { User } from "grommet-icons/es6/icons/User";
export var TabsWithIcons = function TabsWithIcons() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "medium"
    }, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
      title: "General",
      icon: /*#__PURE__*/React.createElement(HomeRounded, null)
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small"
    }, "General Information")), /*#__PURE__*/React.createElement(Tab, {
      title: "Account",
      icon: /*#__PURE__*/React.createElement(User, null)
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small"
    }, "Account Information")), /*#__PURE__*/React.createElement(Tab, {
      title: "Billing",
      icon: /*#__PURE__*/React.createElement(Currency, null)
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small"
    }, "Billing Information")), /*#__PURE__*/React.createElement(Tab, {
      title: "Notifications",
      icon: /*#__PURE__*/React.createElement(Notification, null)
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small"
    }, "Notifications will show here."))))
    // </Grommet>
  );
};

TabsWithIcons.storyName = 'Tabs with icons';
export default {
  title: 'Controls/Tabs/Tabs with icons'
};
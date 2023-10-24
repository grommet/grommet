import React from 'react';
import { Notification } from 'grommet';
import { Box } from '../../Box';
import { Text } from '../../Text';
var StatusNotification = function StatusNotification() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    justify: "center",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }, "Default (No status prop)"), /*#__PURE__*/React.createElement(Notification, {
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }, "Normal"), /*#__PURE__*/React.createElement(Notification, {
    status: "normal",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }, "Warning"), /*#__PURE__*/React.createElement(Notification, {
    status: "warning",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }, "Critical"), /*#__PURE__*/React.createElement(Notification, {
    status: "critical",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/React.createElement(Box, {
    gap: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }, "Unknown"), /*#__PURE__*/React.createElement(Notification, {
    status: "unknown",
    title: "Status Title",
    message: "This is an example of message text"
  })));
};
export var Status = function Status() {
  return /*#__PURE__*/React.createElement(StatusNotification, null);
};
export default {
  title: 'Visualizations/Notification/Status'
};
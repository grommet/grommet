import React, { useState } from 'react';
import { Notification } from 'grommet';
import { Button } from '../../Button';
import { Box } from '../../Box';
var TitleAndMessageNotification = function TitleAndMessageNotification() {
  var _useState = useState(false),
    visible = _useState[0],
    setVisible = _useState[1];
  var onOpen = function onOpen() {
    return setVisible(true);
  };
  var onClose = function onClose() {
    return setVisible(undefined);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Show Notification",
    onClick: onOpen
  })), visible && /*#__PURE__*/React.createElement(Notification, {
    toast: true,
    title: "Status Title",
    message: "Messages should be at max two lines of text.",
    onClose: onClose
  }));
};
export var Toast = function Toast() {
  return /*#__PURE__*/React.createElement(TitleAndMessageNotification, null);
};
Toast.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Notification/Toast'
};
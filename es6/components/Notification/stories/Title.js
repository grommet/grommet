import React, { useState } from 'react';
import { Grommet, Notification } from 'grommet';
import { grommet } from 'grommet/themes';
import { Button } from '../../Button';
import { Box } from '../../Box';

var TitleNotification = function TitleNotification() {
  var _useState = useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

  var onOpen = function onOpen() {
    return setVisible(true);
  };

  var onClose = function onClose() {
    return setVisible(undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Show Notification",
    onClick: onOpen
  })), visible && /*#__PURE__*/React.createElement(Notification, {
    toast: true,
    title: "Status Title",
    onClose: onClose
  }));
};

export var ToastTitleOnly = function ToastTitleOnly() {
  return /*#__PURE__*/React.createElement(TitleNotification, null);
};
export default {
  title: 'Visualizations/Notification/Toast Title Only'
};
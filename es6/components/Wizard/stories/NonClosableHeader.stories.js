// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Button, Heading, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
var steps = [{
  id: 'details',
  title: 'Details',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Enter the request details.");
  }
}, {
  id: 'review',
  title: 'Review',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Review the request before submitting.");
  }
}];
var NonClosableHeader = function NonClosableHeader() {
  var _useState = useState(false),
    saved = _useState[0],
    setSaved = _useState[1];
  var title = /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "medium",
    flex: true
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "small",
    margin: "none"
  }, "New request"), /*#__PURE__*/React.createElement(Button, {
    label: "Save draft",
    onClick: function onClick() {
      return setSaved(true);
    }
  }));
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "New request",
    closable: false,
    title: title,
    showProgress: "horizontal",
    steps: steps
  }), saved && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Draft saved",
    onClose: function onClose() {
      return setSaved(false);
    }
  }));
};
NonClosableHeader.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Non Closable Header'
};
export { NonClosableHeader };
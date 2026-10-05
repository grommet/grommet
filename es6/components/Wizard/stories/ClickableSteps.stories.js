// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, CheckBox, FormField, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
var ClickableSteps = function ClickableSteps() {
  var _useState = useState(false),
    complete = _useState[0],
    setComplete = _useState[1];
  var _useState2 = useState({
      advanced: false
    }),
    value = _useState2[0],
    setValue = _useState2[1];
  var steps = [{
    id: 'details',
    title: 'Details',
    description: 'Provide the resource details.',
    render: function render(/* step, api */
    ) {
      return /*#__PURE__*/React.createElement(Box, {
        gap: "small"
      }, /*#__PURE__*/React.createElement(Paragraph, null, "Describe the resource to create."), /*#__PURE__*/React.createElement(FormField, {
        htmlFor: "resource-name",
        label: "Resource name",
        name: "name",
        required: true
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: "resource-name",
        name: "name"
      })), /*#__PURE__*/React.createElement(FormField, {
        name: "advanced"
      }, /*#__PURE__*/React.createElement(CheckBox, {
        name: "advanced",
        label: "Enable advanced options"
      })));
    }
  }, {
    id: 'configure',
    title: 'Configure',
    description: 'Choose configuration options.',
    status: 'error',
    errorMessage: 'Configuration requires attention.',
    render: function render() {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Configure the resource options.");
    }
  }, {
    id: 'advanced',
    title: 'Advanced',
    description: 'Configure advanced resource options.',
    disabled: !value.advanced,
    disabledReason: 'Enable advanced options to configure this step.',
    render: function render() {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Configure advanced resource options.");
    }
  }, {
    id: 'review',
    title: 'Review',
    description: 'Review before creating the resource.',
    render: function render(step, api) {
      return /*#__PURE__*/React.createElement(Paragraph, null, "Review the configuration for ", api.formValue.name || 'your resource', ".");
    }
  }];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Create resource",
    clickableSteps: true,
    title: "Create resource",
    showProgress: "vertical",
    steps: steps,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }), complete && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    onClose: function onClose() {
      return setComplete(false);
    }
  }));
};
ClickableSteps.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Clickable Steps'
};
export { ClickableSteps };
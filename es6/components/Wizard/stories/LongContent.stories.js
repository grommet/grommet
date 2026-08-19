// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, FormField, Heading, Notification, Paragraph, TextArea, TextInput } from 'grommet';
import { Wizard } from '../Wizard';

// Long-content step demonstrating that the wizard header, stepper, and
// footer remain in place while the content column scrolls internally.
// Uses form fields plus a big block of prose so vertical space is
// clearly exceeded on typical viewports.
var LongStepBody = function LongStepBody(_ref) {
  var heading = _ref.heading,
    _ref$count = _ref.count,
    count = _ref$count === void 0 ? 40 : _ref$count;
  return /*#__PURE__*/React.createElement(Box, {
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: {
      vertical: 'none'
    }
  }, heading), /*#__PURE__*/React.createElement(Paragraph, {
    fill: true
  }, "Scroll this content column. The wizard header at the top and the footer at the bottom stay pinned \u2014 only the middle scrolls."), /*#__PURE__*/React.createElement(FormField, {
    label: "Name",
    htmlFor: "long-content-name"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "long-content-name",
    placeholder: "Your name"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Notes",
    htmlFor: "long-content-notes"
  }, /*#__PURE__*/React.createElement(TextArea, {
    id: "long-content-notes",
    rows: 4,
    placeholder: "Notes\u2026"
  })), Array.from({
    length: count
  }).map(function (_, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Paragraph, {
        key: index,
        fill: true
      }, "Filler paragraph " + (index + 1) + ". This wizard example intentionally\n          renders a lot of content so the scroll behavior is visible in\n          Storybook. Long-form documentation, review screens, and\n          confirmation lists commonly exceed the viewport height and\n          need the middle column to scroll while the primary\n          navigation stays visible.")
    );
  }));
};

// Step data intentionally omits `description` so the stepper shows
// only the step titles; the descriptive text is rendered instead as
// the content heading inside the white card via LongStepBody.
var steps = [{
  id: 'details',
  title: 'Details',
  render: function render() {
    return /*#__PURE__*/React.createElement(LongStepBody, {
      heading: "Enter details for the new resource"
    });
  }
}, {
  id: 'configure',
  title: 'Configure',
  render: function render() {
    return /*#__PURE__*/React.createElement(LongStepBody, {
      heading: "Configure options for this resource",
      count: 30
    });
  }
}, {
  id: 'review',
  title: 'Review',
  render: function render() {
    return /*#__PURE__*/React.createElement(LongStepBody, {
      heading: "Review and finish",
      count: 60
    });
  }
}];
var LongContent = function LongContent() {
  var _useState = useState(null),
    result = _useState[0],
    setResult = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Long content wizard",
    title: "Create resource",
    showProgress: "horizontal",
    steps: steps,
    onComplete: function onComplete(_ref2) {
      var value = _ref2.value;
      return setResult({
        status: 'complete',
        value: value
      });
    }
  }), result && /*#__PURE__*/React.createElement(Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    message: result.value && Object.keys(result.value).length > 0 ? "Completed: " + JSON.stringify(result.value) : undefined,
    onClose: function onClose() {
      return setResult(null);
    }
  }));
};
LongContent.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Long Content'
};
export { LongContent };
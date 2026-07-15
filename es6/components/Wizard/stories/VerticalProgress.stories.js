import React, { useState } from 'react';
import { Box, Grommet, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';
var steps = [{
  id: 'plan',
  title: 'Plan',
  description: 'Choose an approach.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Plan step content.");
  }
}, {
  id: 'build',
  title: 'Build',
  description: 'Do the work.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Build step content.");
  }
}, {
  id: 'deploy',
  title: 'Deploy',
  description: 'Ship it.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Deploy step content.");
  }
}];
var VerticalProgress = function VerticalProgress() {
  var _useState = useState(null),
    result = _useState[0],
    setResult = _useState[1];
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Deployment wizard",
    header: {
      title: 'Deploy an application'
    },
    direction: "vertical",
    steps: steps,
    onComplete: function onComplete(value) {
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
  })));
};
export default {
  title: 'Layout/Wizard/Vertical Progress'
};
export { VerticalProgress };
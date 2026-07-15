import React, { useState } from 'react';
import { Box, Button, Grommet, Heading, Layer, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Controlled Wizard: parent owns currentStep and reacts to onStepChange.
var steps = [{
  id: 'one',
  title: 'One',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Step one.");
  }
}, {
  id: 'two',
  title: 'Two',
  skippable: true,
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Step two.");
  }
}, {
  id: 'three',
  title: 'Three',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Step three.");
  }
}];
var Controlled = function Controlled() {
  var _useState = useState('one'),
    currentStep = _useState[0],
    setCurrentStep = _useState[1];
  var _useState2 = useState(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = useState(0),
    resetKey = _useState3[0],
    setResetKey = _useState3[1];
  var _useState4 = useState(false),
    confirmCancel = _useState4[0],
    setConfirmCancel = _useState4[1];
  var _useState5 = useState(true),
    wizardOpen = _useState5[0],
    setWizardOpen = _useState5[1];
  var handleCancel = function handleCancel() {
    setConfirmCancel(true);
  };
  var confirmCancelYes = function confirmCancelYes() {
    setConfirmCancel(false);
    setResult(null);
    setCurrentStep('one');
    setResetKey(function (key) {
      return key + 1;
    });
    setWizardOpen(false);
  };
  var confirmCancelNo = function confirmCancelNo() {
    setConfirmCancel(false);
  };
  var reopenWizard = function reopenWizard() {
    setWizardOpen(true);
  };
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, wizardOpen ? /*#__PURE__*/React.createElement(Wizard, {
    key: resetKey,
    "aria-label": "Controlled wizard",
    header: {
      title: 'Configure workspace'
    },
    steps: steps,
    currentStep: currentStep,
    onStepChange: function onStepChange(event) {
      if (event.phase === 'navigated' && event.to) {
        setCurrentStep(event.to);
      }
    },
    onComplete: function onComplete(value) {
      return setResult({
        status: 'complete',
        value: value
      });
    },
    onCancel: handleCancel
  }) : /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: "Reopen wizard",
    onClick: reopenWizard
  })), confirmCancel && /*#__PURE__*/React.createElement(Layer, {
    modal: true,
    position: "center",
    onEsc: confirmCancelNo,
    onClickOutside: confirmCancelNo
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    gap: "medium",
    width: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    margin: "none"
  }, "Cancel wizard?"), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "none"
  }, "Are you sure you want to cancel? Your progress will be lost."), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    justify: "end",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Keep editing",
    onClick: confirmCancelNo
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Yes, cancel",
    primary: true,
    color: "status-critical",
    onClick: confirmCancelYes
  })))), result && /*#__PURE__*/React.createElement(Notification, {
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
  title: 'Layout/Wizard/Controlled'
};
export { Controlled };
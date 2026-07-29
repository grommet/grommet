import React, { useState } from 'react';
import { Box, Button, Layer, Notification, Paragraph } from 'grommet';
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { FormPrevious } from "grommet-icons/es6/icons/FormPrevious";
import { Wizard } from '../Wizard';
import { WizardFooter } from '../WizardFooter';
import { useWizard } from '../WizardContext';

// Wizard inside a modal Layer. `onCancel` wires the header X to the
// parent-owned close handler. A custom footer composed via <WizardFooter>
// children preserves the themed shell while omitting the Cancel button.
var NoCancelFooter = function NoCancelFooter() {
  var _useWizard = useWizard(),
    currentStepIndex = _useWizard.currentStepIndex,
    totalSteps = _useWizard.totalSteps,
    canGoNext = _useWizard.canGoNext,
    previous = _useWizard.previous,
    next = _useWizard.next,
    complete = _useWizard.complete;
  var isFirstStep = currentStepIndex <= 0;
  var isLastStep = currentStepIndex >= totalSteps - 1;
  return /*#__PURE__*/React.createElement(WizardFooter, null, !isFirstStep && /*#__PURE__*/React.createElement(Button, {
    label: "Previous",
    icon: /*#__PURE__*/React.createElement(FormPrevious, {
      "aria-hidden": "true"
    }),
    onClick: previous
  }), isLastStep ? /*#__PURE__*/React.createElement(Button, {
    label: "Complete",
    primary: true,
    disabled: !canGoNext,
    onClick: complete
  }) : /*#__PURE__*/React.createElement(Button, {
    label: "Next",
    primary: true,
    reverse: true,
    icon: /*#__PURE__*/React.createElement(FormNext, {
      "aria-hidden": "true"
    }),
    disabled: !canGoNext,
    onClick: next
  }));
};
var steps = [{
  id: 'details',
  title: 'Details',
  description: 'Enter details for the new resource.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Describe the resource you are creating.");
  }
}, {
  id: 'configure',
  title: 'Configure',
  description: 'Configure options for this resource.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Pick configuration options.");
  }
}, {
  id: 'review',
  title: 'Review',
  description: 'Review and finish.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Confirm and create the resource.");
  }
}];
var Modal = function Modal() {
  var _useState = useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = useState(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var _useState3 = useState(0),
    resetKey = _useState3[0],
    setResetKey = _useState3[1];
  var close = function close() {
    setOpen(false);
    setResetKey(function (key) {
      return key + 1;
    });
  };
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "start"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: "Open wizard",
    onClick: function onClick() {
      return setOpen(true);
    }
  })), open &&
  /*#__PURE__*/
  // Composed sizing: the wrapping Layer + Box choose the modal's
  // dimensions. Swap these values to make the wizard narrower,
  // wider, or full-screen — the Wizard fills whatever it's placed in.
  React.createElement(Layer, {
    modal: true,
    position: "center",
    onEsc: close,
    onClickOutside: close
  }, /*#__PURE__*/React.createElement(Box, {
    width: "xlarge",
    height: "large"
  }, /*#__PURE__*/React.createElement(Wizard, {
    key: resetKey,
    "aria-label": "Modal wizard",
    title: "Create resource",
    showProgress: "horizontal",
    steps: steps,
    footer: /*#__PURE__*/React.createElement(NoCancelFooter, null),
    onComplete: function onComplete(_ref) {
      var value = _ref.value;
      setResult({
        status: 'complete',
        value: value
      });
      close();
    },
    onCancel: close
  }))), result && /*#__PURE__*/React.createElement(Notification, {
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
Modal.args = {
  full: true
};
export default {
  title: 'Layout/Wizard/Modal'
};
export { Modal };
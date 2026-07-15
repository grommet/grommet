import React, { useState } from 'react';
import { Box, Button, Grommet, Layer, Notification, Paragraph, RadioButtonGroup, ResponsiveContext, Text } from 'grommet';
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { FormPrevious } from "grommet-icons/es6/icons/FormPrevious";
import { Wizard } from '../Wizard';
import { WizardFooter } from '../WizardFooter';
import { useWizard } from '../WizardContext';
import { grommet } from '../../../themes';

// Wizard inside a modal Layer. `onCancel` wires the header X to the
// parent-owned close handler. A custom footer composed via <WizardFooter>
// children preserves the themed shell while omitting the Cancel button.
var NoCancelFooter = function NoCancelFooter() {
  var _useWizard = useWizard(),
    isFirstStep = _useWizard.isFirstStep,
    isLastStep = _useWizard.isLastStep,
    canGoNext = _useWizard.canGoNext,
    canGoPrevious = _useWizard.canGoPrevious,
    previous = _useWizard.previous,
    next = _useWizard.next,
    complete = _useWizard.complete;
  return /*#__PURE__*/React.createElement(WizardFooter, null, !isFirstStep && /*#__PURE__*/React.createElement(Button, {
    label: "Previous",
    icon: /*#__PURE__*/React.createElement(FormPrevious, {
      "aria-hidden": "true"
    }),
    disabled: !canGoPrevious,
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
  var _useState2 = useState('narrow'),
    kind = _useState2[0],
    setKind = _useState2[1];
  var _useState3 = useState(null),
    result = _useState3[0],
    setResult = _useState3[1];
  var _useState4 = useState(0),
    resetKey = _useState4[0],
    setResetKey = _useState4[1];
  var close = function close() {
    setOpen(false);
    setResetKey(function (key) {
      return key + 1;
    });
  };
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Consumer, null, function (size) {
    return size !== 'small' && /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Wizard kind:"), /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "modal-wizard-kind",
      direction: "row",
      gap: "medium",
      options: ['full', 'narrow', 'wide'],
      value: kind,
      onChange: function onChange(event) {
        return setKind(event.target.value);
      }
    }));
  }), /*#__PURE__*/React.createElement(Box, {
    align: "start"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    label: "Open wizard",
    onClick: function onClick() {
      return setOpen(true);
    }
  })), open && /*#__PURE__*/React.createElement(Layer, {
    modal: true,
    full: kind === 'full',
    position: "center",
    onEsc: close,
    onClickOutside: close
  }, /*#__PURE__*/React.createElement(Box, {
    fill: kind === 'full',
    width: kind === 'full' ? undefined : 'xlarge',
    height: kind === 'full' ? undefined : 'large'
  }, /*#__PURE__*/React.createElement(Wizard, {
    key: resetKey,
    "aria-label": "Modal wizard",
    kind: kind,
    header: {
      title: 'Create resource'
    },
    steps: steps,
    footer: /*#__PURE__*/React.createElement(NoCancelFooter, null),
    onComplete: function onComplete(value) {
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
  })));
};
export default {
  title: 'Layout/Wizard/Modal'
};
export { Modal };
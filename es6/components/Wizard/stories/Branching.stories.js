function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useMemo, useState } from 'react';
import { Box, CheckBox, Grommet, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

// Branching wizard: the Review step is added to the wizard only when the
// user checks "Include a manual review step". The stepper reflects the
// live shape of the flow — Review appears/disappears as the choice
// changes.
var planStep = {
  id: 'plan',
  title: 'Plan',
  description: 'Include optional a manual review.',
  render: function render(step, api) {
    return /*#__PURE__*/React.createElement(CheckBox, {
      label: "Include a manual review step",
      checked: !!api.formValue.review,
      onChange: function onChange(event) {
        return api.setFormValue(_extends({}, api.formValue, {
          review: event.target.checked
        }));
      }
    });
  }
};
var reviewStep = {
  id: 'review',
  title: 'Review',
  description: 'Someone will review your changes.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Reviewer will be assigned.");
  }
};
var deployStep = {
  id: 'deploy',
  title: 'Deploy',
  description: 'Deploy your changes.',
  render: function render() {
    return /*#__PURE__*/React.createElement(Paragraph, null, "Ready to deploy.");
  }
};
var Branching = function Branching() {
  var _useState = useState({
      review: false
    }),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = useState(null),
    result = _useState2[0],
    setResult = _useState2[1];
  var steps = useMemo(function () {
    return value.review ? [planStep, reviewStep, deployStep] : [planStep, deployStep];
  }, [value.review]);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Wizard, {
    "aria-label": "Deployment",
    header: {
      title: 'Deploy an application'
    },
    steps: steps,
    value: value,
    onValueChange: setValue,
    onComplete: function onComplete(nextValue) {
      return setResult({
        status: 'complete',
        value: nextValue
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
  title: 'Layout/Wizard/Branching'
};
export { Branching };
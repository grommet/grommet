function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
var propType = {};
if (process.env.NODE_ENV !== 'production') {
  var stepShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    render: PropTypes.func,
    validate: PropTypes.func,
    nextStep: PropTypes.func,
    skippable: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledReason: PropTypes.string,
    'aria-label': PropTypes.string
  };
  var nestedStepShape = _extends({}, stepShape, {
    children: PropTypes.array
  });
  propType = {
    steps: PropTypes.arrayOf(PropTypes.shape(nestedStepShape)).isRequired,
    currentStep: PropTypes.string,
    defaultStep: PropTypes.string,
    showProgress: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    onStepChange: PropTypes.func,
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
    renderStep: PropTypes.func,
    title: PropTypes.string,
    footer: PropTypes.node,
    scrollToTop: PropTypes.bool,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    id: PropTypes.string,
    'aria-label': PropTypes.string,
    children: PropTypes.node,
    messages: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
      skip: PropTypes.string,
      cancel: PropTypes.string,
      close: PropTypes.string,
      complete: PropTypes.string,
      counter: PropTypes.string,
      progress: PropTypes.string,
      validationError: PropTypes.string
    })
  };
}
export var WizardPropTypes = propType;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
var PropType = {};
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
  PropType = {
    steps: PropTypes.arrayOf(PropTypes.shape(nestedStepShape)).isRequired,
    currentStep: PropTypes.string,
    defaultStep: PropTypes.string,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
    onStepChange: PropTypes.func,
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
    renderStep: PropTypes.func,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.node
    })]),
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    scrollToTop: PropTypes.bool,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    onValueChange: PropTypes.func,
    id: PropTypes.string,
    'aria-label': PropTypes.string,
    a11yTitle: PropTypes.string,
    children: PropTypes.node,
    messages: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
      skip: PropTypes.string,
      cancel: PropTypes.string,
      close: PropTypes.string,
      complete: PropTypes.string,
      stepCounter: PropTypes.string,
      progress: PropTypes.string,
      validationError: PropTypes.string
    })
  };
}
export var WizardPropTypes = PropType;
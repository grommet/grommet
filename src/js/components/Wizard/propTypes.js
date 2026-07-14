import PropTypes from 'prop-types';

let PropType = {};

if (process.env.NODE_ENV !== 'production') {
  const stepShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    render: PropTypes.func,
    validate: PropTypes.func,
    nextStep: PropTypes.func,
    skippable: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledReason: PropTypes.string,
    'aria-label': PropTypes.string,
  };

  const nestedStepShape = {
    ...stepShape,
    children: PropTypes.array,
  };

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
    header: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        title: PropTypes.node,
        description: PropTypes.node,
      }),
    ]),
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
      validationError: PropTypes.string,
    }),
  };
}

export const WizardPropTypes = PropType;

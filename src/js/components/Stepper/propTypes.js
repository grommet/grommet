import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        status: PropTypes.oneOf(['pending', 'completed', 'error', 'disabled']),
        disabledReason: PropTypes.string,
        errorMessage: PropTypes.string,
        children: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            status: PropTypes.oneOf([
              'pending',
              'completed',
              'error',
              'disabled',
            ]),
            disabledReason: PropTypes.string,
            errorMessage: PropTypes.string,
          }),
        ),
      }),
    ).isRequired,
    currentStep: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    clickableSteps: PropTypes.bool,
    onStepClick: PropTypes.func,
    id: PropTypes.string,
    children: PropTypes.node,
  };
}

export const StepperPropTypes = PropType;

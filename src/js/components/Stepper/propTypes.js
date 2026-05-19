import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  const stepShape = PropTypes.shape({
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
        status: PropTypes.oneOf(['pending', 'completed', 'error', 'disabled']),
        disabledReason: PropTypes.string,
        errorMessage: PropTypes.string,
      }),
    ), // Recursive shape for nested steps
  });

  PropType = {
    ...genericProps,
    steps: PropTypes.arrayOf(stepShape).isRequired,
    currentStep: PropTypes.string,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    clickableSteps: PropTypes.bool,
    onStepClick: PropTypes.func,
    children: PropTypes.node,
  };
}
export const StepperPropTypes = PropType;

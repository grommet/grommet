import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  const stepDefinitionShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    skippable: PropTypes.bool,
    validation: PropTypes.func,
    nextStep: PropTypes.func,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        skippable: PropTypes.bool,
        validation: PropTypes.func,
        nextStep: PropTypes.func,
      }),
    ),
  });

  PropType = {
    ...genericProps,
    steps: PropTypes.arrayOf(stepDefinitionShape).isRequired,
    // Uncontrolled mode
    defaultStep: PropTypes.string,
    // Controlled mode
    currentStep: PropTypes.string,
    onStepChange: PropTypes.func,
    // Completion / cancellation
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
    // Progress display
    showProgress: PropTypes.oneOf([false, 'horizontal', 'vertical']),
    // Behavior
    scrollToTop: PropTypes.bool,
    // Content injection
    renderStep: PropTypes.func,
    // HTML
    id: PropTypes.string,
    a11yTitle: PropTypes.string,
    children: PropTypes.node,
  };
}
export const WizardPropTypes = PropType;

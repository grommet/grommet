import PropTypes from 'prop-types';
import { FormFieldPropTypes } from '../FormField/propTypes';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    formProps: FormFieldPropTypes,
    onChange: PropTypes.func,
    scale: PropTypes.number,
    value: PropTypes.number,
  };
}
export const FeedbackPosNegPropTypes = PropType;

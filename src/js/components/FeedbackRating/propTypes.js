import PropTypes from 'prop-types';
import { FormFieldPropTypes } from '../FormField/propTypes';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: PropTypes.string,
    formProps: FormFieldPropTypes,
    name: PropTypes.string,
    label: PropType.string,
    onChange: PropTypes.func,
    scale: PropTypes.number,
    value: PropTypes.number,
  };
}
export const FeedbackRatingTypes = PropType;

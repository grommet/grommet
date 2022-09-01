import PropTypes from 'prop-types';
import { genericSelectProps } from '../Select/propTypes';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericSelectProps,
    defaultValue: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
      ]),
    ),
    help: PropTypes.node,
    limit: PropTypes.number,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.number,
      ]),
    ),
    showSelectedInline: PropTypes.bool,
    sortSelectedOnClose: PropTypes.bool,
  };
}
export const SelectMultiplePropTypes = PropType;

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
    messages: PropTypes.shape({
      clearAll: PropTypes.string,
      clearAllA11y: PropTypes.string,
      multiple: PropTypes.string,
      onMore: PropTypes.string,
      open: PropTypes.string,
      optionNotSelected: PropTypes.string,
      optionSelected: PropTypes.string,
      search: PropTypes.string,
      selectAll: PropTypes.string,
      selectAllA11y: PropTypes.string,
      selectDropDown: PropTypes.string,
      selected: PropTypes.string,
      selectedOfTotal: PropTypes.string,
      selectedOptions: PropTypes.string,
    }),
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

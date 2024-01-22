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
      multiple: PropTypes.string,
      clearAll: PropTypes.string,
      selectAll: PropTypes.string,
      selectedMultipleNonTotal: PropTypes.string,
      selectedMultiple: PropTypes.string,
      onMore: PropTypes.string,
      clearAllA11y: PropTypes.string,
      selectAllA11y: PropTypes.string,
      selectDropDown: PropTypes.string,
      dropDown: PropTypes.string,
      searchFilter: PropTypes.string,
      optionSelected: PropTypes.string,
      optionNotSelected: PropTypes.string,
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

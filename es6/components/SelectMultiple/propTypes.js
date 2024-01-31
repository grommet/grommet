function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { genericSelectProps } from '../Select/propTypes';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericSelectProps, {
    defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])),
    help: PropTypes.node,
    limit: PropTypes.number,
    messages: PropTypes.shape({
      clearAll: PropTypes.string,
      clearAllA11y: PropTypes.string,
      // "multiple" kept for backwards compatibility,
      // but summarizedValue should be used instead
      multiple: PropTypes.string,
      open: PropTypes.string,
      optionNotSelected: PropTypes.string,
      optionSelected: PropTypes.string,
      search: PropTypes.string,
      selectAll: PropTypes.string,
      selectAllA11y: PropTypes.string,
      selectDrop: PropTypes.string,
      selected: PropTypes.string,
      selectedOfTotal: PropTypes.string,
      selectedOptions: PropTypes.string,
      showMore: PropTypes.string,
      summarizedValue: PropTypes.string
    }),
    showSelectedInline: PropTypes.bool,
    sortSelectedOnClose: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]))
  });
}
export var SelectMultiplePropTypes = PropType;
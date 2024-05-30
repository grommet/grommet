function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
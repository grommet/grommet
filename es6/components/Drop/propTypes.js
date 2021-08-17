import PropTypes from 'prop-types';
import { backgroundDoc, roundPropType, marginProp, OVERFLOW_VALUES } from '../../utils/general-prop-types'; // if you update values here, make sure to update in Box too.

var dropOverflowPropTypes = PropTypes.oneOfType([PropTypes.oneOf(OVERFLOW_VALUES), PropTypes.shape({
  horizontal: PropTypes.oneOf(OVERFLOW_VALUES),
  vertical: PropTypes.oneOf(OVERFLOW_VALUES)
}), PropTypes.string]);
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    align: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }),
    background: backgroundDoc,
    elevation: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    margin: marginProp,
    onClickOutside: PropTypes.func,
    onEsc: PropTypes.func,
    overflow: dropOverflowPropTypes,
    plain: PropTypes.bool,
    responsive: PropTypes.bool,
    restrictFocus: PropTypes.bool,
    round: roundPropType,
    stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['align'])]),
    target: PropTypes.object.isRequired,
    trapFocus: PropTypes.bool
  };
}

export var DropPropTypes = PropType;
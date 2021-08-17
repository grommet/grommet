import PropTypes from 'prop-types';
import { backgroundDoc } from '../../utils/general-prop-types';
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    animate: PropTypes.bool,
    animation: PropTypes.oneOfType([PropTypes.oneOf(['slide', 'fadeIn', 'none']), PropTypes.bool]),
    background: backgroundDoc,
    full: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['vertical', 'horizontal'])]),
    margin: PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(PAD_SIZES)), PropTypes.shape({
      bottom: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      end: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      horizontal: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      start: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string])
    }), PropTypes.string]),
    modal: PropTypes.bool,
    onClickOutside: PropTypes.func,
    onEsc: PropTypes.func,
    plain: PropTypes.bool,
    position: PropTypes.oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right']),
    responsive: PropTypes.bool,
    target: PropTypes.object
  };
}

export var LayerPropTypes = PropType;
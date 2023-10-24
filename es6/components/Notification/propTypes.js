import PropTypes from 'prop-types';
import { AnchorPropTypes } from '../Anchor/propTypes';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    actions: PropTypes.arrayOf(PropTypes.shape(AnchorPropTypes)),
    global: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    status: PropTypes.oneOf(['critical', 'warning', 'normal', 'info', 'unknown']),
    toast: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      autoClose: PropTypes.bool,
      position: PropTypes.oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right'])
    })]),
    onClose: PropTypes.func,
    icon: PropTypes.element,
    time: PropTypes.number
  };
}
export var NotificationType = PropType;
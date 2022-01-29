import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    position: PropTypes.oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right']),
    status: PropTypes.oneOf(['critical', 'warning', 'normal', 'unknown']),
    toast: PropTypes.bool,
    onClose: PropTypes.func
  };
}

export var NotificationType = PropType;
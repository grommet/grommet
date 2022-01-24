import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    position: PropTypes.oneOf(['top', 'top-right']),
    status: PropTypes.oneOf(['critical', 'warning', 'normal', 'unknown']),
    toast: PropTypes.bool,
    onClose: PropTypes.func,
  };
}
export const NotificationType = PropType;

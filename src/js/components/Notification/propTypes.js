import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    title: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.oneOf(['critical', 'warning', 'normal', 'unknown']),
    toast: PropTypes.bool,
    onClose: PropTypes.func,
  };
}
export const NotificationType = PropType;

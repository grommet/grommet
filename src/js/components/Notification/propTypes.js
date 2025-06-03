import PropTypes from 'prop-types';
import { AnchorPropTypes } from '../Anchor/propTypes';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    id: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape(AnchorPropTypes)),
    global: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    messages: PropTypes.shape({
      close: PropTypes.string,
    }),
    status: PropTypes.oneOf([
      'critical',
      'warning',
      'normal',
      'info',
      'unknown',
    ]),
    toast: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        autoClose: PropTypes.bool,
        position: PropTypes.oneOf([
          'bottom',
          'bottom-left',
          'bottom-right',
          'center',
          'end',
          'hidden',
          'left',
          'right',
          'start',
          'top',
          'top-left',
          'top-right',
        ]),
      }),
    ]),
    onClose: PropTypes.func,
    icon: PropTypes.element,
    time: PropTypes.number,
  };
}
export const NotificationType = PropType;

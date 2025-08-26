import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    open: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    unmount: PropType.bool,
  };
}
export const CollapsiblePropTypes = PropType;

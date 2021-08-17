import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    open: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
  };
}
export const CollapsiblePropTypes = PropType;

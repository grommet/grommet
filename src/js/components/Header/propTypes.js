import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    sticky: PropTypes.oneOf(['scrollup']),
  };
}
export const HeaderPropTypes = PropType;

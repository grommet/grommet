import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    sticky: PropTypes.oneOf(['scrollup'])
  };
}
export var HeaderPropTypes = PropType;
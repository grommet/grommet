import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    open: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical'])
  };
}

export var CollapsiblePropTypes = PropType;
import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: PropTypes.node,
    dropProps: PropTypes.object,
    plain: PropTypes.bool
  };
}

export var TipPropTypes = PropType;
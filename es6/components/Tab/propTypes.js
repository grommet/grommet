import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    plain: PropTypes.bool,
    reverse: PropTypes.bool,
    title: PropTypes.node
  };
}

export var TabPropTypes = PropType;
import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    value: PropTypes.shape({})
  };
}

export var ThemeContextPropTypes = PropType;
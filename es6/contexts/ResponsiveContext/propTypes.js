import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.func
  };
}

export var ResponsiveContextPropTypes = PropType;
import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', '2xl', '3xl', '4xl', '5xl']), PropTypes.string]),
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };
}

export var AvatarPropTypes = PropType;
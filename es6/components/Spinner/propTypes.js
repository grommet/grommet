import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string
    })]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string
    })])
  };
}

export var SpinnerPropTypes = PropType;
import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    id: PropTypes.string,
    fill: PropTypes.bool,
    focusIndicator: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    plain: PropTypes.bool,
    value: PropTypes.string,
    resize: PropTypes.oneOfType([PropTypes.oneOf(['vertical', 'horizontal']), PropTypes.bool]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), PropTypes.string])
  };
}

export var TextAreaPropTypes = PropType;
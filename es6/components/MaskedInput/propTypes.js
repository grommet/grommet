import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    dropProps: PropTypes.object,
    icon: PropTypes.element,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    focusIndicator: PropTypes.bool,
    onBlur: PropTypes.func,
    mask: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
      fixed: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      regexp: PropTypes.shape({}) // RegExp

    })),
    reverse: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), PropTypes.string]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
}

export var MaskedInputPropTypes = PropType;
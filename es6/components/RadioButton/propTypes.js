import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };
}

export var RadioButtonPropTypes = PropType;
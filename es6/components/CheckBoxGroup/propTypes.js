import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    disabled: PropTypes.bool,
    labelKey: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({}))]),
    valueKey: PropTypes.string
  };
}

export var CheckBoxGroupPropTypes = PropType;
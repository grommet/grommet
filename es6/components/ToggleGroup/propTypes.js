import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    multiple: PropTypes.bool,
    onToggle: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      value: PropTypes.string,
      tip: PropTypes.string
    }))]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  };
}
export var ToggleGroupPropTypes = PropType;
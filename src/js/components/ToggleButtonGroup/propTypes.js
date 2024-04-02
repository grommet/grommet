import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
          value: PropTypes.oneOfType([PropTypes.string]),
        }),
      ),
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  };
}
export const ToggleButtonGroupPropTypes = PropType;

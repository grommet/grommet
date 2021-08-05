import PropTypes from 'prop-types';

export const RadioButtonPropType = {
  a11yTitle: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

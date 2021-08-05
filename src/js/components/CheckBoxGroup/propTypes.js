import PropTypes from 'prop-types';

export const CheckBoxGroupPropType = {
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  disabled: PropTypes.bool,
  labelKey: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  valueKey: PropTypes.string,
};

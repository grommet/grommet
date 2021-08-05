import PropTypes from 'prop-types';

export const RadioButtonGroupPropType = {
  children: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.bool),
    PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        id: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ]).isRequired,
      }),
    ),
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]),
};

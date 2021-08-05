import PropTypes from 'prop-types';

export const FormPropType = {
  errors: PropTypes.shape({}),
  infos: PropTypes.shape({}),
  messages: PropTypes.shape({
    invalid: PropTypes.string,
    required: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onValidate: PropTypes.func,
  validate: PropTypes.oneOf(['blur', 'submit', 'change']),
  value: PropTypes.shape({}),
};

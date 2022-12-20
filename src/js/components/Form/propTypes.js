import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    errors: PropTypes.shape({}),
    infos: PropTypes.shape({}),
    kind: PropTypes.string,
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
}
export const FormPropTypes = PropType;

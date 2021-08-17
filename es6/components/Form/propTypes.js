import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    errors: PropTypes.shape({}),
    infos: PropTypes.shape({}),
    messages: PropTypes.shape({
      invalid: PropTypes.string,
      required: PropTypes.string
    }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onValidate: PropTypes.func,
    validate: PropTypes.oneOf(['blur', 'submit', 'change']),
    value: PropTypes.shape({})
  };
}

export var FormPropTypes = PropType;
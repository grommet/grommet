import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Form) {
  var DocumentedForm = describe(Form).availableAt(getAvailableAtBadge('Form')).description('A form that manages state for its fields.').usage("import { Form } from 'grommet';\n<Form />").intrinsicElement('form');
  DocumentedForm.propTypes = {
    errors: PropTypes.shape({}).description("An object representing any errors in the data. They keys should\n        match the keys in the value object.").defaultValue({}),
    infos: PropTypes.shape({}).description("An object representing any information details in the data.\n        They keys should match the keys in the value object.").defaultValue({}),
    messages: PropTypes.shape({
      invalid: PropTypes.string,
      required: PropTypes.string
    }).description('Custom validation messages.').defaultValue({
      invalid: 'invalid',
      required: 'required'
    }),
    onChange: PropTypes.func.description('Function that will be called when any fields are updated.'),
    onSubmit: PropTypes.func.description("Function that will be called when the form is submitted. The\n      single argument is an event containing the latest value object\n      via `event.value` and an object indicating which fields were\n      touched via `event.touched`."),
    onReset: PropTypes.func.description("Function that will be called when the form is reset. The\n      single argument is the event provided by react."),
    validate: PropTypes.oneOf(['blur', 'submit']).description('When to perform validation').defaultValue('submit'),
    value: PropTypes.shape({}).description('An object representing all of the data in the form.').defaultValue({})
  };
  return DocumentedForm;
};
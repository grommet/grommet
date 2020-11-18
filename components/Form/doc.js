"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Form) {
  var DocumentedForm = (0, _reactDesc.describe)(Form).availableAt((0, _mixins.getAvailableAtBadge)('Form', 'Input')).description('A form that manages state for its fields.').usage("import { Form } from 'grommet';\n<Form />").intrinsicElement('form');
  DocumentedForm.propTypes = {
    errors: _reactDesc.PropTypes.shape({}).description("An object representing any errors in the data. Their keys should\n        match the keys in the value object.").defaultValue({}),
    infos: _reactDesc.PropTypes.shape({}).description("An object representing any information details in the data.\n        Their keys should match the keys in the value object.").defaultValue({}),
    messages: _reactDesc.PropTypes.shape({
      invalid: _reactDesc.PropTypes.string,
      required: _reactDesc.PropTypes.string
    }).description('Custom validation messages.').defaultValue({
      invalid: 'invalid',
      required: 'required'
    }),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when any fields are updated.\n      The fields must have a non-null `name` property assigned."),
    onSubmit: _reactDesc.PropTypes.func.description("Function that will be called when the form is submitted. The\n      single argument is an event containing the latest value object\n      via `event.value` and an object indicating which fields were\n      touched via `event.touched`."),
    onReset: _reactDesc.PropTypes.func.description("Function that will be called when the form is reset. The\n      single argument is the event provided by react."),
    onValidate: _reactDesc.PropTypes.func.description("Function that will be called when the form is validated. The\n      single argument is an event containing the latest error object\n      via `validationResults.errors` and info object via \n      `validationResults.infos`."),
    validate: _reactDesc.PropTypes.oneOf(['blur', 'submit']).description('When to perform validation').defaultValue('submit'),
    value: _reactDesc.PropTypes.shape({}).description('An object representing all of the data in the form.').defaultValue({})
  };
  return DocumentedForm;
};

exports.doc = doc;
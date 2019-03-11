"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Form) {
  var DocumentedForm = (0, _reactDesc.describe)(Form).availableAt((0, _utils.getAvailableAtBadge)('Form')).description('A form that manages state for its fields.').usage("import { Form } from 'grommet';\n<Form />").intrinsicElement('form');
  DocumentedForm.propTypes = {
    errors: _reactDesc.PropTypes.shape({}).description("An object representing any errors in the data. They keys should\n        match the keys in the value object.").defaultValue({}),
    messages: _reactDesc.PropTypes.shape({
      invalid: _reactDesc.PropTypes.string,
      required: _reactDesc.PropTypes.string
    }).description('Custom validation messages.').defaultValue({
      invalid: 'invalid',
      required: 'required'
    }),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when any fields are updated.'),
    onSubmit: _reactDesc.PropTypes.func.description("Function that will be called when the form is submitted. The\n      single argument is an event containing the latest value object\n      via `event.value`."),
    onReset: _reactDesc.PropTypes.func.description("Function that will be called when the form is reset. The\n      single argument is the event provided by react."),
    value: _reactDesc.PropTypes.shape({}).description('An object representing all of the data in the form.').defaultValue({})
  };
  return DocumentedForm;
};

exports.doc = doc;
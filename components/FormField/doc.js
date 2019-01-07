"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(FormField) {
  var DocumentedFormField = (0, _reactDesc.describe)(FormField).availableAt((0, _utils.getAvailableAtBadge)('FormField')).description("A single field in a form. FormField wraps an input component with\n      a label, help, and/or error messaging. It typically contains an input\n      control like TextInput, TextArea, Select, etc.").usage("import { FormField } from 'grommet';\n<FormField />").intrinsicElement('div');
  DocumentedFormField.propTypes = {
    error: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Any error text describing issues with the field'),
    help: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Any help text describing how the field works'),
    htmlFor: _reactDesc.PropTypes.string.description('The id of the input element contained in this field'),
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('A short label describing the field'),
    name: _reactDesc.PropTypes.string.description("The name of the value data when in a Form and the name of\n      the input field."),
    pad: _reactDesc.PropTypes.bool.description('Whether to add padding to align with the padding of TextInput.'),
    required: _reactDesc.PropTypes.bool.description('Whether the field is required.'),
    validate: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.shape({
      regexp: _reactDesc.PropTypes.object,
      // regular expression
      message: _reactDesc.PropTypes.string
    }), _reactDesc.PropTypes.func]).description("Validation rule. Provide a regular expression or a function. If a\n      function is provided, it will be called with two arguments, the value\n      for this field and the entire value object. This permits validation to\n      encompass multiple fields. The function should return a string message\n      describing the validation issue, if any.")
  };
  return DocumentedFormField;
};

exports.doc = doc;
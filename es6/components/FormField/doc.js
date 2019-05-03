import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(FormField) {
  var DocumentedFormField = describe(FormField).availableAt(getAvailableAtBadge('FormField')).description("A single field in a form. FormField wraps an input component with\n      a label, help, and/or error messaging. It typically contains an input\n      control like TextInput, TextArea, Select, etc.").usage("import { FormField } from 'grommet';\n<FormField />").intrinsicElement('div');
  DocumentedFormField.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).description("The component to insert in the FormField. Grommet will add update the form values when this field changes. Any additional properties (such as initial value) you pass to FormField will be forwarded to this component. The component may be custom as long it supports the proporties of name, value, onChange (event => {}), while event has either event.value or event.target.value.  "),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('Any error text describing issues with the field'),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('Any help text describing how the field works'),
    htmlFor: PropTypes.string.description('The id of the input element contained in this field'),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('A short label describing the field'),
    name: PropTypes.string.description("The name of the value data when in a Form and the name of\n      the input field."),
    pad: PropTypes.bool.description('Whether to add padding to align with the padding of TextInput.'),
    required: PropTypes.bool.description('Whether the field is required.'),
    validate: PropTypes.oneOfType([PropTypes.shape({
      regexp: PropTypes.object,
      // regular expression
      message: PropTypes.string
    }), PropTypes.func]).description("Validation rule when used within a grommet Form. Provide a regular\n      expression or a function. If a\n      function is provided, it will be called with two arguments, the value\n      for this field and the entire value object. This permits validation to\n      encompass multiple fields. The function should return a string message\n      describing the validation issue, if any.")
  };
  return DocumentedFormField;
};
export var themeDoc = {
  'formField.border.color': {
    description: 'The border color.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: 'border'
  },
  'formField.border.error.color': {
    description: 'The border color of the error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: "{ dark: 'white', light: 'status-critical' },"
  },
  'formField.border.position': {
    description: 'The border position.',
    type: 'string',
    defaultValue: 'inner'
  },
  'formField.border.side': {
    description: 'The border side of the FormField.',
    type: 'string',
    defaultValue: 'bottom'
  },
  'formField.content.pad': {
    description: 'The pad of the FormField content.',
    type: 'object',
    defaultValue: "{ horizontal: 'small', bottom: 'small' }"
  },
  'formField.error.color': {
    description: 'The color of the FormField error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: "{ dark: 'status-critical', light: 'status-critical' }"
  },
  'formField.error.margin': {
    description: 'The margin used for the FormField error.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }"
  },
  'formField.extend': {
    description: 'Any additional style for FormField.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'formField.help.color': {
    description: 'The color of the FormField help.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: "{ dark: 'dark-3', light: 'dark-3' }"
  },
  'formField.help.margin': {
    description: 'The margin for the FormField help.',
    type: 'string | object',
    defaultValue: "{ left: 'small' }"
  },
  'formField.label.margin': {
    description: 'The margin for the FormField label.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }"
  },
  'formField.margin': {
    description: 'The margin of FormField.',
    type: 'string | object',
    defaultValue: "{ bottom: 'small' }"
  },
  'global.borderSize': {
    description: 'The possible border sizes for FormField.',
    type: 'object',
    defaultValue: "{\n  xsmall: '1px',\n  small: '2px',\n  medium: '4px',\n  large: '12px',\n  xlarge: '24px,\n}"
  }
};
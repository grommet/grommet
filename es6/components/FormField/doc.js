import { describe, PropTypes } from 'react-desc';
import { marginProp } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(FormField) {
  var DocumentedFormField = describe(FormField).availableAt(getAvailableAtBadge('FormField', 'Input')).description("A single field in a form. FormField wraps an input component with\n      a label, help, and/or error messaging. It typically contains an input\n      control like TextInput, TextArea, Select, etc.").usage("import { FormField } from 'grommet';\n<FormField />").intrinsicElement('div');
  DocumentedFormField.propTypes = {
    a11yTitle: PropTypes.string.description("Custom label to be used by screen readers.\n       Should only be provided if FormField has no children.\n       When a11yTitle is provided an aria-label will be added to the element\n       if it has no children."),
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).description("The component to insert in the FormField. Grommet will add update the\n      form values when this field changes. Any additional properties\n      (such as initial value) you pass to FormField will be forwarded to this\n      component. The component may be custom as long it supports the properties\n      of name, value, onChange (event => {}), while event has either event.value\n      or event.target.value."),
    contentProps: PropTypes.object.description("Any valid Box property. These\n     properties are applied to the FormField contents container and will\n     override properties from the theme."),
    disabled: PropTypes.bool.description('Whether the field should look disabled.'),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description("Any error text describing issues with the field's value"),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('Any help text describing how the field works'),
    htmlFor: PropTypes.string.description('The id of the input element contained in this field'),
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description("Any informational text regarding the field's value"),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('A short label describing the field'),
    name: PropTypes.string.description("The name of the value data when in a Form and the name of\n      the input field."),
    margin: marginProp,
    pad: PropTypes.bool.description('Whether to add padding to align with the padding of TextInput.'),
    required: PropTypes.bool.description('Whether the field is required.'),
    validate: PropTypes.oneOfType([PropTypes.shape({
      regexp: PropTypes.instanceOf(RegExp),
      // regular expression
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      status: PropTypes.oneOf(['error', 'info'])
    }), PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      regexp: PropTypes.instanceOf(RegExp),
      // regular expression
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      status: PropTypes.oneOf(['error', 'info'])
    }), PropTypes.func]))]).description("Validation rule when used within a grommet Form. Provide an object\n      with a regular expression, a function, or an array of these. If a\n      function is provided, it will be called with two arguments, the value\n      for this field and the entire value object. This permits validation to\n      encompass multiple fields. The function should return a string message\n      describing the validation issue, if any, or an object with 'message'\n      and 'status' properties.")
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
  'formField.content.margin': {
    description: 'The margin of the FormField content.',
    type: 'object',
    defaultValue: undefined
  },
  'formField.content.pad': {
    description: 'The pad of the FormField content.',
    type: 'object',
    defaultValue: 'small'
  },
  'formField.disabled.background.color': {
    description: 'The color of the FormField background when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
  },
  'formField.disabled.background.opacity': {
    description: 'The opacity of the FormField background when it is disabled.',
    type: 'string | boolean | number',
    defaultValue: undefined
  },
  'formField.disabled.border.color': {
    description: 'The color of the FormField border when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
  },
  'formField.disabled.label.color': {
    description: 'The color of the FormField label when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
  },
  'formField.error.background.color': {
    description: 'The color of the FormField background when there is an error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
  },
  'formField.error.background.opacity': {
    description: 'The opacity of the FormField background when there is an error.',
    type: 'string | boolean | number',
    defaultValue: undefined
  },
  'formField.error.color': {
    description: 'The color of the FormField error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: 'status-critical'
  },
  'formField.error.container': {
    description: "Any valid Box props for the container surrounding the error \n    message and icon.",
    type: 'object',
    defaultValue: undefined
  },
  'formField.error.icon': {
    description: 'An icon placed in a row with the error message.',
    type: 'React.Element',
    defaultValue: undefined
  },
  'formField.error.size': {
    description: "The size of the error message to be displayed.\n     The default size is medium.",
    type: 'string',
    defaultValue: 'medium'
  },
  'formField.error.size.xsmall': {
    description: "The size of a 'xsmall' error message.",
    type: 'string',
    defaultValue: '12px'
  },
  'formField.error.size.small': {
    description: "The size of a 'small' error message.",
    type: 'string',
    defaultValue: '14px'
  },
  'formField.error.size.medium': {
    description: "The size of a 'medium' error message.",
    type: 'string',
    defaultValue: '18px'
  },
  'formField.error.size.large': {
    description: "The size of a 'large' error message.",
    type: 'string',
    defaultValue: '22px'
  },
  'formField.error.size.xlarge': {
    description: "The size of a 'xlarge' error message.",
    type: 'string',
    defaultValue: '26px'
  },
  'formField.info.container': {
    description: "Any valid Box props for the container surrounding the info \n    message and icon.",
    type: 'object',
    defaultValue: undefined
  },
  'formField.info.icon': {
    description: 'An icon placed in a row with the info message.',
    type: 'React.Element',
    defaultValue: undefined
  },
  'formField.error.margin': {
    description: 'The margin used for the FormField error.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }"
  },
  'formField.focus.background.color': {
    description: 'The color of the FormField background when it is in focus.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
  },
  'formField.focus.border.color': {
    description: 'The color of the FormField border when it is in focus.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined
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
  'formField.info.color': {
    description: 'The color of the FormField info.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: 'text-xweak'
  },
  'formField.info.margin': {
    description: 'The margin used for the FormField info.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }"
  },
  'formField.label': {
    description: 'Any props of Text that will be applied on the FormField label.',
    type: 'object',
    defaultValue: 'undefined'
  },
  'formField.label.margin': {
    description: 'The margin for the FormField label.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }"
  },
  'formField.label.requiredIndicator': {
    description: "Whether an asterisk (*) indicating that an input is required \n    should be displayed adjacent to the FormField's label. If providing a \n    custom element, for accessibility it is recommended that you include \n    an a11yTitle of \"required\" to assist screen readers. If using \"true\", the \n    a11yTitle is automatically applied.",
    type: 'boolean | element | string',
    defaultValue: 'undefined'
  },
  'formField.margin': {
    description: 'The margin of FormField.',
    type: 'string | object',
    defaultValue: "{ bottom: 'small' }"
  },
  'formField.round': {
    description: 'The rounding of the FormField.',
    type: 'boolean | string | object',
    defaultValue: 'undefined'
  },
  'global.borderSize': {
    description: 'The possible border sizes for FormField.',
    type: 'object',
    defaultValue: "{\n  xsmall: '1px',\n  small: '2px',\n  medium: '4px',\n  large: '12px',\n  xlarge: '24px,\n}"
  }
};
import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, marginProp } from '../../utils';

export const doc = FormField => {
  const DocumentedFormField = describe(FormField)
    .availableAt(getAvailableAtBadge('FormField'))
    .description(
      `A single field in a form. FormField wraps an input component with
      a label, help, and/or error messaging. It typically contains an input
      control like TextInput, TextArea, Select, etc.`,
    )
    .usage(
      `import { FormField } from 'grommet';
<FormField />`,
    )
    .intrinsicElement('div');

  DocumentedFormField.propTypes = {
    a11yTitle: PropTypes.string.description(
      `Custom label to be used by screen readers.
       Should only be provided if FormField has no children.
       When a11yTitle is provided an aria-label will be added to the element
       if it has no children.`,
    ),
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]).description(
      `The component to insert in the FormField. Grommet will add update the
      form values when this field changes. Any additional properties
      (such as initial value) you pass to FormField will be forwarded to this
      component. The component may be custom as long it supports the properties
      of name, value, onChange (event => {}), while event has either event.value
      or event.target.value.`,
    ),
    contentProps: PropTypes.object.description(`Any valid Box property. These
     properties are applied to the FormField contents container and will
     override properties from the theme.`),
    disabled: PropTypes.bool.description(
      'Whether the field should look disabled.',
    ),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      "Any error text describing issues with the field's value",
    ),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'Any help text describing how the field works',
    ),
    htmlFor: PropTypes.string.description(
      'The id of the input element contained in this field',
    ),
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      "Any informational text regarding the field's value",
    ),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'A short label describing the field',
    ),
    name: PropTypes.string.description(
      `The name of the value data when in a Form and the name of
      the input field.`,
    ),
    margin: marginProp,
    pad: PropTypes.bool.description(
      'Whether to add padding to align with the padding of TextInput.',
    ),
    required: PropTypes.bool.description('Whether the field is required.'),
    validate: PropTypes.oneOfType([
      PropTypes.shape({
        regexp: PropTypes.instanceOf(RegExp), // regular expression
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        status: PropTypes.oneOf(['error', 'info']),
      }),
      PropTypes.func,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            regexp: PropTypes.instanceOf(RegExp), // regular expression
            message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            status: PropTypes.oneOf(['error', 'info']),
          }),
          PropTypes.func,
        ]),
      ),
    ]).description(
      `Validation rule when used within a grommet Form. Provide an object
      with a regular expression, a function, or an array of these. If a
      function is provided, it will be called with two arguments, the value
      for this field and the entire value object. This permits validation to
      encompass multiple fields. The function should return a string message
      describing the validation issue, if any, or an object with 'message'
      and 'status' properties.`,
    ),
  };

  return DocumentedFormField;
};

export const themeDoc = {
  'formField.border.color': {
    description: 'The border color.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: 'border',
  },
  'formField.border.error.color': {
    description: 'The border color of the error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: "{ dark: 'white', light: 'status-critical' },",
  },
  'formField.border.position': {
    description: 'The border position.',
    type: 'string',
    defaultValue: 'inner',
  },
  'formField.border.side': {
    description: 'The border side of the FormField.',
    type: 'string',
    defaultValue: 'bottom',
  },
  'formField.content.margin': {
    description: 'The margin of the FormField content.',
    type: 'object',
    defaultValue: undefined,
  },
  'formField.content.pad': {
    description: 'The pad of the FormField content.',
    type: 'object',
    defaultValue: 'small',
  },
  'formField.disabled.background.color': {
    description: 'The color of the FormField background when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.disabled.background.opacity': {
    description: 'The opacity of the FormField background when it is disabled.',
    type: 'string | boolean | number',
    defaultValue: undefined,
  },
  'formField.disabled.border.color': {
    description: 'The color of the FormField border when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.disabled.label.color': {
    description: 'The color of the FormField label when it is disabled.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.error.background.color': {
    description:
      'The color of the FormField background when there is an error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.error.background.opacity': {
    description:
      'The opacity of the FormField background when there is an error.',
    type: 'string | boolean | number',
    defaultValue: undefined,
  },
  'formField.error.color': {
    description: 'The color of the FormField error.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: 'status-critical',
  },
  'formField.error.margin': {
    description: 'The margin used for the FormField error.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }",
  },
  'formField.focus.background.color': {
    description: 'The color of the FormField background when it is in focus.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.focus.border.color': {
    description: 'The color of the FormField border when it is in focus.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: undefined,
  },
  'formField.extend': {
    description: 'Any additional style for FormField.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'formField.help.color': {
    description: 'The color of the FormField help.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: "{ dark: 'dark-3', light: 'dark-3' }",
  },
  'formField.help.margin': {
    description: 'The margin for the FormField help.',
    type: 'string | object',
    defaultValue: "{ left: 'small' }",
  },
  'formField.info.color': {
    description: 'The color of the FormField info.',
    type: "string | {'dark': string, 'light': string}",
    defaultValue: 'text-xweak',
  },
  'formField.info.margin': {
    description: 'The margin used for the FormField info.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }",
  },
  'formField.label': {
    description:
      'Any props of Text that will be applied on the FormField label.',
    type: 'object',
    defaultValue: 'undefined',
  },
  'formField.label.margin': {
    description: 'The margin for the FormField label.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xsmall', horizontal: 'small' }",
  },
  'formField.margin': {
    description: 'The margin of FormField.',
    type: 'string | object',
    defaultValue: "{ bottom: 'small' }",
  },
  'formField.round': {
    description: 'The rounding of the FormField.',
    type: 'boolean | string | object',
    defaultValue: 'undefined',
  },
  'global.borderSize': {
    description: 'The possible border sizes for FormField.',
    type: 'object',
    defaultValue: `{
  xsmall: '1px',
  small: '2px',
  medium: '4px',
  large: '12px',
  xlarge: '24px,
}`,
  },
};

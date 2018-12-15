import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = FormField => {
  const DocumentedFormField = describe(FormField)
    .availableAt(getAvailableAtBadge('FormField'))
    .description('A field in a form.')
    .usage(
      `import { FormField } from 'grommet';
<FormField />`,
    );

  DocumentedFormField.propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'Any error text describing issues with the field',
    ),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'Any help text describing how the field works',
    ),
    htmlFor: PropTypes.string.description(
      'The id of the input element contained in this field',
    ),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'A short label describing the field',
    ),
    name: PropTypes.string.description(
      `The name of the value data when in a Form and the name of
      the input field.`,
    ),
    pad: PropTypes.bool.description(
      'Whether to add padding to align with the padding of TextInput.',
    ),
    required: PropTypes.bool.description('Whether the field is required.'),
    validate: PropTypes.oneOfType([
      PropTypes.object, // regular expression
      PropTypes.func,
    ]).description(
      `Validation rule. Provide a regular expression or a function. If a
      function is provided, it will be called with two arguments, the value
      for this field and the entire value object. This permits validation to
      encompass multiple fields.`,
    ),
  };

  return DocumentedFormField;
};

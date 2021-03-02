import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Form => {
  const DocumentedForm = describe(Form)
    .availableAt(getAvailableAtBadge('Form', 'Input'))
    .description('A form that manages state for its fields.')
    .usage(
      `import { Form } from 'grommet';
<Form />`,
    )
    .intrinsicElement('form');

  DocumentedForm.propTypes = {
    errors: PropTypes.shape({})
      .description(
        `An object representing any errors in the data. Their keys should
        match the keys in the value object.`,
      )
      .defaultValue({}),
    infos: PropTypes.shape({})
      .description(
        `An object representing any information details in the data.
        Their keys should match the keys in the value object.`,
      )
      .defaultValue({}),
    messages: PropTypes.shape({
      invalid: PropTypes.string,
      required: PropTypes.string,
    })
      .description('Custom validation messages.')
      .defaultValue({ invalid: 'invalid', required: 'required' }),
    onChange: PropTypes.func.description(
      `Function that will be called when any fields are updated.
      The fields must have a non-null \`name\` property assigned.`,
    ),
    onSubmit: PropTypes.func.description(
      `Function that will be called when the form is submitted. The
      single argument is an event containing the latest value object
      via \`event.value\` and an object indicating which fields were
      touched via \`event.touched\`.`,
    ),
    onReset: PropTypes.func.description(
      `Function that will be called when the form is reset. The
      single argument is the event provided by react.`,
    ),
    onValidate: PropTypes.func.description(
      `Function that will be called when the form is validated. The
      single argument is an event containing the latest error object
      via \`validationResults.errors\`, info object via 
      \`validationResults.infos\` and form's validity via \`valid\`.`,
    ),
    validate: PropTypes.oneOf(['blur', 'submit', 'change'])
      .description('When to perform validation')
      .defaultValue('submit'),
    value: PropTypes.shape({})
      .description('An object representing all of the data in the form.')
      .defaultValue({}),
  };

  return DocumentedForm;
};

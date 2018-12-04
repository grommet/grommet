import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Form => {
  const DocumentedForm = describe(Form)
    .availableAt(getAvailableAtBadge('Form'))
    .description('A field in a form.')
    .usage(
      `import { Form } from 'grommet';
<Form />`,
    );

  DocumentedForm.propTypes = {
    onChange: PropTypes.func.description(
      'Function that will be called when any fields are updated.',
    ),
    onSubmit: PropTypes.func.description(
      'Function that will be called when the form is submitted.',
    ),
    value: PropTypes.shape({})
      .description('An object representing all of the data in the form.')
      .defaultValue({}),
  };

  return DocumentedForm;
};

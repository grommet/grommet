import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = TextArea => {
  const DocumentedTextArea = describe(TextArea)
    .availableAt(getAvailableAtBadge('TextArea'))
    .description('A textarea.')
    .usage(
      `import { TextArea } from 'grommet';
<TextArea id='item' name='item' />`,
    );

  DocumentedTextArea.propTypes = {
    id: PropTypes.string.description('The id attribute of the textarea.'),
    fill: PropTypes.oneOf([true, false])
      .description('Whether the width and height should fill the container.')
      .defaultValue(false),
    focusIndicator: PropTypes.bool.description(
      'Whether the plain textarea should receive a focus outline.',
    ),
    name: PropTypes.string.description('The name attribute of the textarea.'),
    onChange: PropTypes.func.description(
      'Function that will be called when the user types in the textarea.',
    ),
    placeholder: PropTypes.string.description(
      'Placeholder text to use when no value is provided.',
    ),
    plain: PropTypes.bool.description(
      `Whether this is a plain textarea with no border or padding.
Only use this when the containing context provides sufficient affordance.`,
    ),
    value: PropTypes.string.description('What text to put in the textarea.'),
  };

  return DocumentedTextArea;
};

export const themeDoc = {
  'global.colors.placeholder': {
    description: 'The text color used for Text.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }",
  },
  'global.control.border.width': {},
  'global.input.weight': {},
  'global.spacing': {},
  textArea: {
    description: `The possible sizes of the text in terms of its font-size and line-height.`,
    type: 'object',
    defaultValue: `{
      xsmall: {
        size: '12px',
        height: '18px',
       },
      small: {
        size: '14px',
        height: '20px',
       },
      medium: {          
        size: '18px',
        height: '24px',
      },
      large: {
        size: '22px',
        height: '28px',
      },
      xlarge: {
        size: '26px',
        height: '32px',
      },
      xxlarge: {
        size: '34px',
        height: '40px',
      },
    }`,
  },
};

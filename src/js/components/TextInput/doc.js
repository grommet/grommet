import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, themeDocUtils } from '../../utils';

export const doc = TextInput => {
  const DocumentedTextInput = describe(TextInput)
    .availableAt(getAvailableAtBadge('TextInput'))
    .description(
      'A control to input a single line of text, with optional suggestions.',
    )
    .usage(
      `import { TextInput } from 'grommet';
<TextInput id='item' name='item' />`,
    )
    .intrinsicElement('input');

  DocumentedTextInput.propTypes = {
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    })
      .description('How to align the drop.')
      .defaultValue({
        top: 'bottom',
        left: 'left',
      }),
    dropHeight: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The height of the drop container.'),
    dropTarget: PropTypes.object.description(
      `Target where any suggestions drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the TextInput itself by default.`,
    ),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    icon: PropTypes.element.description(
      `An optional icon to show. This could be used to provide an
      indication of what kind of input is expected, like an email icon,
      or what the input will be used for, like a search icon.`,
    ),
    id: PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: PropTypes.bool.description(
      'Whether the plain text input should receive a focus outline.',
    ),
    messages: PropTypes.shape({
      enterSelect: PropTypes.string,
      suggestionsCount: PropTypes.string,
      suggestionsExist: PropTypes.string,
      suggestionIsOpen: PropTypes.string,
    })
      .description(
        `Custom messages for TextInput. Used for accessibility by screen 
        readers.`,
      )
      .defaultValue({
        enterSelect: '(Press Enter to Select)',
        suggestionsCount: 'suggestions available',
        suggestionsExist:
          'This input has suggestions use arrow keys to navigate',
        suggestionIsOpen:
          'Suggestions drop is open, continue to use arrow keys to navigate',
      }),
    name: PropTypes.string.description(
      `The name of the attribute when in a Form or FormField.`,
    ),
    onChange: PropTypes.func.description(
      'Function that will be called when the user types in the input.',
    ),
    onSelect: PropTypes.func.description(
      `Function that will be called when the user selects a suggestion.
The suggestion contains the object chosen from the supplied suggestions.`,
    ),
    onSuggestionsOpen: PropTypes.func.description(
      'Function that will be called when the suggestions drop is opened.',
    ),
    onSuggestionsClose: PropTypes.func.description(
      'Function that will be called when the suggestions drop is closed.',
    ),
    placeholder: PropTypes.node.description(
      'Placeholder to use when no value is provided.',
    ),
    plain: PropTypes.bool.description(
      `Whether this is a plain input with no border or padding.
Only use this when the containing context provides sufficient affordance`,
    ),
    reverse: PropTypes.bool.description(
      `Whether an icon should be reversed so that the icon is at the
      end of the input.`,
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the TextInput.'),
    suggestions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.any,
        }),
        PropTypes.string,
      ]),
    ).description(
      `Suggestions to show. It is recommended to avoid showing too many
suggestions and instead rely on the user to type more.`,
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).description('What text to put in the input.'),
  };

  return DocumentedTextInput;
};

export const themeDoc = {
  'global.colors.border': {
    description: 'The color of the border.',
    type: 'object',
    defaultValue: {
      dark: 'rgba(255, 255, 255, 0.33)',
      light: 'rgba(0, 0, 0, 0.33)',
    },
  },
  'global.control.border.color': {
    description: 'The border color.',
    type: 'string',
    defaultValue: 'border',
  },
  'global.control.border.radius': {
    description: 'The border radius.',
    type: 'string',
    defaultValue: '4px',
  },
  'global.control.border.width': {
    description: 'The border width.',
    type: 'string',
    defaultValue: '1px',
  },
  'select.step': {
    description: 'How many suggestions to render at a time.',
    type: 'number',
    defaultValue: 20,
  },
  text: {
    description: `The possible sizes of the text in terms of its font-size and 
    line-height.`,
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
  'textInput.extend': {
    description: 'Any additional style for TextInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.container.extend': {
    description: 'Any additional style for TextInput container.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.placeholder.extend': {
    description:
      'Any additional style for non-string placeholder inside TextInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.suggestions.extend': {
    description: 'Any additional style for TextInput suggestions.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.disabled.opacity': {
    description: 'The opacity when the textInput is disabled.',
    type: 'number',
    defaultValue: 0.3,
  },
  ...themeDocUtils.focusStyle,
  ...themeDocUtils.placeholderStyle,
  ...themeDocUtils.disabledStyle,
  ...themeDocUtils.inputStyle,
};

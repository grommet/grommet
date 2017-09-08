import { schema, PropTypes } from 'react-desc';

export default TextInput => schema(TextInput, {
  description: 'A text input field with optional suggestions.',
  usage: `import { TextInput } from 'grommet';
  <TextInput id='item' name='item' />`,
  props: {
    defaultValue: [
      PropTypes.string, 'What text to start with in the input.',
    ],
    id: [
      PropTypes.string, 'The id attribute of the input.',
    ],
    name: [
      PropTypes.string, 'The name attribute of the input.',
    ],
    onInput: [
      PropTypes.func,
      'Function that will be called when the user types in the input.',
    ],
    onSelect: [
      PropTypes.func,
      `Function that will be called when the user selects a suggestion.
      The suggestion contains the object chosen from the supplied suggestions.`,
    ],
    placeholder: [
      PropTypes.string, 'Placeholder text to use when the input is empty.',
    ],
    suggestions: [
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            label: PropTypes.node,
            value: PropTypes.any,
          }),
          PropTypes.string,
        ])
      ),
      `Suggestions to show. It is recommended to avoid showing too many
      suggestions and instead rely on the user to type more.`,
    ],
    value: [
      PropTypes.string, 'What text to put in the input.',
    ],
  },
});

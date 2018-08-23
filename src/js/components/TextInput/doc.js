import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (TextInput) => {
  const DocumentedTextInput = describe(TextInput)
    .availableAt(getAvailableAtBadge('TextInput'))
    .description(
      'A text input field with optional suggestions.'
    ).usage(
      `import { TextInput } from 'grommet';
<TextInput id='item' name='item' />`
    );

  DocumentedTextInput.propTypes = {
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    }).description('How to align the drop.').defaultValue({
      top: 'top',
      left: 'left',
    }),
    dropTarget: PropTypes.object.description(
      `Target where any suggestions drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the TextInput itself by default.`),
    id: PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: PropTypes.bool.description(
      'Whether the plain text input should receive a focus outline.'
    ),
    messages: PropTypes.shape({
      enterSelect: PropTypes.string,
      suggestionsCount: PropTypes.string,
      suggestionsExist: PropTypes.string,
      suggestionIsOpen: PropTypes.string,
    }).description(
      'Custom messages for TextInput. Used for accessibility by screen readers.'
    ).defaultValue({
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate',
    }),
    name: PropTypes.string.description('The name attribute of the input.'),
    onInput: PropTypes.func.description(
      'Function that will be called when the user types in the input.'
    ),
    onSelect: PropTypes.func.description(
      `Function that will be called when the user selects a suggestion.
The suggestion contains the object chosen from the supplied suggestions.`
    ),
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).description(
      'Placeholder to use when no value is provided.'
    ),
    plain: PropTypes.bool.description(
      `Whether this is a plain input with no border or padding.
Only use this when the containing context provides sufficient affordance`
    ),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).description(
      'The size of the TextInput.'
    ),
    suggestions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.any,
        }),
        PropTypes.string,
      ])
    ).description(
      `Suggestions to show. It is recommended to avoid showing too many
suggestions and instead rely on the user to type more.`
    ),
    value: PropTypes.string.description('What text to put in the input.'),
  };

  return DocumentedTextInput;
};

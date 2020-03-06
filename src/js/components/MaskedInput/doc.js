import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, themeDocUtils } from '../../utils';

export const doc = MaskedInput => {
  const DocumentedMaskedInput = describe(MaskedInput)
    .availableAt(getAvailableAtBadge('MaskedInput'))
    .description('An input field with formalized syntax.')
    .usage(
      `import { MaskedInput } from 'grommet';
<MaskedInput id='item' name='item' />`,
    )
    .intrinsicElement('input');

  DocumentedMaskedInput.propTypes = {
    icon: PropTypes.element.description(
      `An optional icon to show. This could be used to provide an
      indication of what kind of input is expected, like an email icon,
      or what the input will be used for, like a search icon.`,
    ),
    id: PropTypes.string.description('The id attribute of the input.'),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description(
      `Function that will be called when the user types or pastes text.`,
    ),
    onBlur: PropTypes.func.description(
      `Function that will be called when the user leaves the field.`,
    ),
    mask: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.arrayOf(PropTypes.number),
        ]),
        fixed: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ),
        regexp: PropTypes.shape({}), // RegExp
      }),
    ).description(
      `Describes the structure of the mask. If a regexp is provided, it should
      allow both the final full string element as well as partial strings
      as the user types characters one by one.`,
    ),
    reverse: PropTypes.bool.description(
      `Whether an icon should be reversed so that the icon is at the
      end of the input.`,
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the text.'),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).description(
      `What text to put in the input. The caller should ensure that it
      is initially valid with respect to the mask.`,
    ),
  };

  return DocumentedMaskedInput;
};

export const themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }",
  },
  'global.hover.color': {
    description: 'The text color when hovering.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }",
  },
  'maskedInput.extend': {
    description: 'Any additional style for MaskedInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'text.medium': {
    description: 'The size of the text for MaskedInput.',
    type: 'string',
    defaultValue: '18px',
  },
  ...themeDocUtils.focusStyle,
  ...themeDocUtils.placeholderStyle,
  ...themeDocUtils.inputStyle,
};

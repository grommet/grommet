import { PropTypes, describe } from 'react-desc';
import { getAvailableAtBadge, themeDocUtils } from '../../utils';

export const doc = NumberInput => {
  const DocumentedNumberInput = describe(NumberInput)
    .availableAt(getAvailableAtBadge('NumberInput'))
    .description('A control to input a nnumbers')
    .usage(
      `import { NumberInput } from 'grommet';
      <NumberInput id='item' name='item' />`,
    )
    .intrinsicElement('input');

  DocumentedNumberInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: PropTypes.bool.description(
      'Whether the plain text input should receive a focus outline.',
    ),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description(
      'Function that will be called when the user types in the input.',
    ),
    placeholder: PropTypes.node.description(
      'Placeholder to use when no value is provided.',
    ),
    plain: PropTypes.bool.description(
      `Whether this is a plain input with no border or padding.
Only use this when the containing context provides sufficient affordance`,
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the NumberInput.'),
    value: PropTypes.oneOfType([PropTypes.number]).description(
      'What number to put in the input.',
    ),
  };

  return DocumentedNumberInput;
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
    description: 'Any additional style for NumberInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.container.extend': {
    description: 'Any additional style for NumberInput container.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'textInput.placeholder.extend': {
    description:
      'Any additional style for non-string placeholder inside NumberInput.',
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

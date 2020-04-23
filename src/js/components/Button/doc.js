import { describe, PropTypes } from 'react-desc';

import {
  colorPropType,
  genericProps,
  getAvailableAtBadge,
  hoverIndicatorPropType,
  themeDocUtils,
} from '../../utils';

export const doc = Button => {
  const DocumentedButton = describe(Button)
    .availableAt(getAvailableAtBadge('Button'))
    .description('A button.')
    .details(
      `You can provide a single function child that will be called with
      'hover' and 'focus' keys. This allows you to customize the rendering
      of the Button in those cases.`,
    )
    .usage(
      `import { Button } from 'grommet';
<Button primary label='Label' />`,
    )
    .intrinsicElement('button');

  DocumentedButton.propTypes = {
    ...genericProps,
    active: PropTypes.bool
      .description('Whether the button is active.')
      .defaultValue(false),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description(
      `The DOM tag or react component to use for the element.`,
    ),
    color: colorPropType.description(
      'Fill color for primary, label color for plain, border color otherwise.',
    ),
    disabled: PropTypes.bool
      .description('Whether the button is disabled.')
      .defaultValue(false),
    fill: PropTypes.oneOfType([
      PropTypes.oneOf(['horizontal', 'vertical']),
      PropTypes.bool,
    ])
      .description(
        `Whether the button expands to fill all of the available width and/or 
        height.`,
      )
      .defaultValue(false),
    focusIndicator: PropTypes.bool
      .description("Whether when 'plain' it should receive a focus outline.")
      .defaultValue(true),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
    ])
      .description(
        `The amount of spacing between icon and label in the button.`,
      )
      .defaultValue('small'),
    hoverIndicator: hoverIndicatorPropType
      .description(
        `The hover indicator to apply when the user is mousing over the
button. An object can be also be specified for color index support:
{background: 'neutral-2'}. This prop is meant to be used only
with plain Buttons.`,
      )
      .defaultValue(false),
    href: PropTypes.string.description(
      'If specified, the button will behave like an anchor tag.',
    ),
    icon: PropTypes.element.description('Icon element to place in the button.'),
    label: PropTypes.node.description('Label text to place in the button.'),
    onClick: PropTypes.func.description(
      `Click handler. Not setting this property and not specifying a href
        causes the Button to be disabled.`,
    ),
    plain: PropTypes.bool
      .description(
        `Whether this is a plain button with no border or pad.
          Non plain button will show both pad and border.
          The plain button has no border and unless the icon prop exist it has 
          no pad as well.`,
      )
      .defaultValue(false),
    primary: PropTypes.bool
      .description(
        `Whether this is a primary button. There should be at most one per page
            or screen.`,
      )
      .defaultValue(false),
    reverse: PropTypes.bool
      .description(
        `Whether an icon and label should be reversed so that the icon is at the
              end of the anchor.`,
      )
      .defaultValue(false),
    size: PropTypes.oneOf(['small', 'medium', 'large']).description(
      `The possible sizes of Button, that impacts the overall Button 
      padding, border radius, text size and line height. 
      'size' will not impact any icon related sizing.`,
    ),
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']).description(
      `Specifies where to display the URL defined in the href property.`,
    ),
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
      .description(
        `The type of button. Set the type to submit for the default button on 
                forms.`,
      )
      .defaultValue('button'),
  };

  return DocumentedButton;
};

export const themeDoc = {
  'global.active.background.color': {
    description: 'The background color when using active prop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'active',
  },
  'global.active.background.opacity': {
    description: 'The value used for active button background opacity.',
    type: 'number | string',
    defaultValue: 'medium',
  },
  'global.active.color': {
    description: 'The text color when using active prop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }",
  },
  'button.active.background.color': {
    description: `The background color for active buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.background.opacity': {
    description: `The background opacity for active buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.border.color': {
    description: `The color of the border for active buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.color': {
    description: `The label color for active buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.extend': {
    description: 'Any additional style for an active button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined',
  },
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
  'global.edgeSize.small': {
    description: 'The padding around an icon-only button.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '12px',
  },
  'global.colors.control': {
    description: 'The color of the border.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'accent-1', light: 'brand', }",
  },
  'global.colors.brand': {
    description: 'The light version of the border.',
    type: 'string',
    defaultValue: '#7D4CDB',
  },
  'global.colors.text': {
    description: 'The color of the text label.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }",
  },
  'text.medium.size': {
    description: 'The font size of the text label.',
    type: 'string',
    defaultValue: '18px',
  },
  'text.medium.height': {
    description: 'The line height of the text label.',
    type: 'string',
    defaultValue: '24px',
  },
  'button.border.color': {
    description: `The color of the border.`,
    type: 'string | { dark: string, light: string }',
  },
  'button.border.radius': {
    description: 'The corner radius.',
    type: 'string',
    defaultValue: '18px',
  },
  'button.border.width': {
    description: 'The border width.',
    type: 'string',
    defaultValue: '2px',
  },
  'button.color': {
    description: `The color of the text label.`,
    type: 'string | { dark: string, light: string }',
  },
  'button.disabled.opacity': {
    description: 'The opacity when the button is disabled.',
    type: 'number',
    defaultValue: 0.3,
  },
  'button.disabled.border.color': {
    description: 'The border color when the button is disabled.',
    type: 'string | { dark: string, light: string }',
  },
  'button.disabled.color': {
    description: `Label color when the button is disabled.`,
    type: 'string | { dark: string, light: string }',
  },
  'button.disabled.background.color': {
    description: `Background color when the button is disabled.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined,
  },
  'button.disabled.background.opacity': {
    description: `Background opacity when the button is disabled.`,
    type: 'number',
    defaultValue: undefined,
  },
  'button.disabled.extend': {
    description: 'Any additional style for a disabled Button.',
    type: 'string | (props) => {}',
  },
  'button.disabled.primary.border.color': {
    description: 'The border color when a primary button is disabled.',
    type: 'string | { dark: string, light: string }',
  },
  'button.disabled.primary.color': {
    description: `Label color when a primary button is disabled.`,
    type: 'string | { dark: string, light: string }',
  },
  'button.disabled.primary.background.color': {
    description: `Background color when a primary button is disabled.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined,
  },
  'button.disabled.primary.background.opacity': {
    description: `Background opacity when a primary button is disabled.`,
    type: 'number',
    defaultValue: undefined,
  },
  'button.disabled.primary.extend': {
    description: 'Any additional style for a disabled primary button.',
    type: 'string | (props) => {}',
  },
  'button.padding.horizontal': {
    description: 'The horizontal padding.',
    type: 'string',
    defaultValue: '22px',
  },
  'button.padding.vertical': {
    description: 'The vertical padding.',
    type: 'string',
    defaultValue: '4px',
  },
  'button.primary.color': {
    description: `The label color for primary buttons if 
    button.primary.background is defined. The background color for 
    primary buttons otherwise.`,
    type: 'string | { dark: string, light: string }',
  },
  'button.primary.background.color': {
    description: `The background color for primary buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined,
  },
  'button.primary.background.opacity': {
    description: `The background opacity for primary buttons.`,
    type: 'number',
    defaultValue: undefined,
  },
  'button.primary.extend': {
    description: 'Any additional style for a primary button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined',
  },
  'button.active.primary.background.color': {
    description: `The background color for active primary buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.primary.background.opacity': {
    description: `The background opacity for active primary buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.primary.border.color': {
    description: `The color of the border for active primary buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.primary.color': {
    description: `The label color for active primary buttons.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'undefined',
  },
  'button.active.primary.extend': {
    description: 'Any additional style for an active primary button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined',
  },
  'button.size.small.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '18px',
  },
  'button.size.small.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '20px',
  },
  'button.size.small.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '4px',
  },
  'button.size.medium.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '18px',
  },
  'button.size.medium.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '22px',
  },
  'button.size.medium.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '4px',
  },
  'button.size.large.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '24px',
  },
  'button.size.large.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '32px',
  },
  'button.size.large.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '8px',
  },
  'button.transition.duration': {
    description: `The length of time it will take for the element to transition
between two states.`,
    type: 'number',
    defaultValue: 0.1,
  },
  'button.transition.properties': {
    description: 'The CSS properties you want to add the transition to.',
    type: 'string[]',
    defaultValue: "['color', 'background-color', 'border-color', 'box-shadow']",
  },
  'button.transition.timing': {
    description: `Describes how a transition will progress over one cycle of its
duration and allowing it to change speed during its course.`,
    type: 'string',
    defaultValue: 'ease-in-out',
  },
  'button.extend': {
    description: 'Any additional style for the Button.',
    type: 'string | (props) => {}',
  },
  ...themeDocUtils.focusStyle,
  ...themeDocUtils.disabledStyle,
};

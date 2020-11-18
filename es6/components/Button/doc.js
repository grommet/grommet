function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, colorPropType, hoverIndicatorPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';
export var doc = function doc(Button) {
  var DocumentedButton = describe(Button).availableAt(getAvailableAtBadge('Button', 'Controls')).description('A button.').details("You can provide a single function child that will be called with\n      'disabled', 'hover' and 'focus' keys. \n      This allows you to customize the rendering of the Button in those cases.").usage("import { Button } from 'grommet';\n<Button primary label='Label' />").intrinsicElement('button');
  DocumentedButton.propTypes = _extends({}, genericProps, {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]).description("Function that can be called to render the visual representation.\n      Button can take in Children as a function, node, or object. \n      For example, 'disabled', 'hover', and 'focus' can be passed as an \n      argument that would then return a react element.\n      `children={({ disabled, hover, focus }) => <Box...>{...}</Box>}`. \n      When Button has children, it is styled as a `plain` button.\n      "),
    active: PropTypes.bool.description('Whether the button is active.').defaultValue(false),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("The DOM tag or react component to use for the element."),
    color: colorPropType.description('Fill color for primary, label color for plain, border color otherwise.'),
    disabled: PropTypes.bool.description('Whether the button is disabled.').defaultValue(false),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]).description("Whether the button expands to fill all of the available width and/or \n        height.").defaultValue(false),
    focusIndicator: PropTypes.bool.description("Whether when 'plain' it should receive a focus outline.").defaultValue(true),
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The amount of spacing between icon and label in the button.").defaultValue('small'),
    hoverIndicator: hoverIndicatorPropType.description("The hover indicator to apply when the user is mousing over the\nbutton. An object can be also be specified for color index support:\n{background: 'neutral-2'}. This prop is meant to be used only\nwith plain Buttons.").defaultValue(false),
    href: PropTypes.string.description('If specified, the button will behave like an anchor tag.'),
    icon: PropTypes.element.description('Icon element to place in the button.'),
    label: PropTypes.node.description('Label text to place in the button.'),
    onClick: PropTypes.func.description("Click handler. Not setting this property and not specifying a href\n        causes the Button to be disabled."),
    plain: PropTypes.bool.description("Whether this is a plain button with no border or pad.\n          Non plain button will show both pad and border.\n          The plain button has no border and unless the icon prop exist it has \n          no pad as well. \n          When using the kind button (i.e. button.default on the theme), \n          the usage of plain is deprecated.").defaultValue(false),
    primary: PropTypes.bool.description("Whether this is a primary button. There should be at most one per page\n            or screen.").defaultValue(false),
    reverse: PropTypes.bool.description("Whether an icon and label should be reversed so that the icon is at the\n              end of the anchor.").defaultValue(false),
    secondary: PropTypes.bool.description("Whether this is a secondary button."),
    size: PropTypes.oneOf(['small', 'medium', 'large']).description("The possible sizes of Button, that impacts the overall Button \n      padding, border radius, text size and line height. \n      'size' will not impact any icon related sizing."),
    target: PropTypes.oneOfType([PropTypes.oneOf(['_self', '_blank', '_parent', '_top']), PropTypes.string]).description("Specifies where to display the URL defined in the href property."),
    tip: PropTypes.oneOfType([PropTypes.shape({
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      dropProps: PropTypes.shape({}),
      plain: PropTypes.bool
    }), PropTypes.string]).description("tooltip or a hint when hovering over the button."),
    type: PropTypes.oneOf(['button', 'reset', 'submit']).description("The type of button. Set the type to submit for the default button on \n                forms.").defaultValue('button')
  });
  return DocumentedButton;
};
export var themeDoc = _extends({
  'global.active.background.color': {
    description: 'The background color when using active prop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'active'
  },
  'global.active.background.opacity': {
    description: 'The value used for active button background opacity.',
    type: 'number | string',
    defaultValue: 'medium'
  },
  'global.active.color': {
    description: 'The text color when using active prop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'global.hover.background': {
    description: 'The background style when hovering.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }"
  },
  'global.hover.color': {
    description: 'The text color when hovering.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'global.edgeSize.small': {
    description: 'The padding around an icon-only button.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '12px'
  },
  'global.colors.control': {
    description: 'The color of the border.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'accent-1', light: 'brand', }"
  },
  'global.colors.brand': {
    description: 'The light version of the border.',
    type: 'string',
    defaultValue: '#7D4CDB'
  },
  'global.colors.text': {
    description: 'The color of the text label.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }"
  },
  'text.medium.size': {
    description: 'The font size of the text label.',
    type: 'string',
    defaultValue: '18px'
  },
  'text.medium.height': {
    description: 'The line height of the text label.',
    type: 'string',
    defaultValue: '24px'
  },
  'button.active.background.color': {
    description: "Background color when the button is active.",
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.active.border.color': {
    description: 'The border color when the button is active.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.active.color': {
    description: "Label color when the button is active.",
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.active.extend': {
    description: 'Any additional style for an active Button.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'button.active.default': {
    description: 'Adjustments to the default Button style when the Button is active.',
    type: 'object',
    defaultValue: undefined
  },
  'button.active.primary': {
    description: 'Adjustments to the primary Button style when the Button is active.',
    type: '{}',
    defaultValue: undefined
  },
  'button.active.secondary': {
    description: 'Adjustments to the secondary Button style when the Button is active.',
    type: '{}',
    defaultValue: undefined
  },
  'button.border.color': {
    description: "The color of the border.",
    type: 'string | { dark: string, light: string }'
  },
  'button.border.radius': {
    description: 'The corner radius.',
    type: 'string',
    defaultValue: '18px'
  },
  'button.border.width': {
    description: 'The border width.',
    type: 'string',
    defaultValue: '2px'
  },
  'button.color': {
    description: "The color of the text label.",
    type: 'string | { dark: string, light: string }'
  },
  'button.default.background.color': {
    description: "The color of the background for default buttons.",
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.default.background.opacity': {
    description: 'The value used for default button background opacity.',
    type: 'number | string',
    defaultValue: undefined
  },
  'button.default.border.color': {
    description: "The color of the border for default buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.default.color': {
    description: "The color of the label for default buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.default.font.weight': {
    description: "The weight of the text label for default buttons.",
    type: 'string | number'
  },
  'button.default.extend': {
    description: 'Any additional style for a default button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined'
  },
  'button.default.padding.horizontal': {
    description: 'The horizontal padding for a default button.',
    type: 'string',
    defaultValue: '22px'
  },
  'button.default.padding.vertical': {
    description: 'The vertical padding for a default button.',
    type: 'string',
    defaultValue: '4px'
  },
  'button.disabled.color': {
    description: "Label color when the button is disabled.",
    type: 'string | { dark: string, light: string }'
  },
  'button.disabled.border.color': {
    description: 'The border color when the button is disabled.',
    type: 'string | { dark: string, light: string }'
  },
  'button.disabled.background.color': {
    description: "Background color when the button is disabled.",
    type: 'string | { dark: string, light: string }'
  },
  'button.disabled.opacity': {
    description: 'The opacity when the button is disabled.',
    type: 'number',
    defaultValue: 0.3
  },
  'button.disabled.extend': {
    description: 'Any additional style for a disabled Button.',
    type: 'string | (props) => {}'
  },
  'button.disabled.default': {
    description: 'Adjustments to the default Button style when the Button is disabled.',
    type: '{}',
    defaultValue: undefined
  },
  'button.disabled.primary': {
    description: 'Adjustments to the primary Button style when the Button is disabled.',
    type: '{}',
    defaultValue: undefined
  },
  'button.disabled.secondary': {
    description: 'Adjustments to the secondary Button style when the Button is disabled.',
    type: '{}',
    defaultValue: undefined
  },
  'button.hover.color': {
    description: "Label color when the button is hovered.",
    type: 'string | { dark: string, light: string }'
  },
  'button.hover.border.color': {
    description: 'The border color when the button is hovered.',
    type: 'string | { dark: string, light: string }'
  },
  'button.hover.background.color': {
    description: "Background color when the button is hovered.",
    type: 'string | { dark: string, light: string }'
  },
  'button.hover.extend': {
    description: 'Any additional style for a hovered Button.',
    type: 'string | (props) => {}'
  },
  'button.hover.default': {
    description: 'Adjustments to the default Button style when the Button is hovered.',
    type: '{}',
    defaultValue: undefined
  },
  'button.hover.primary': {
    description: 'Adjustments to the primary Button style when the Button is hovered.',
    type: '{}',
    defaultValue: undefined
  },
  'button.hover.secondary': {
    description: 'Adjustments to the secondary Button style when the Button is hovered.',
    type: '{}',
    defaultValue: undefined
  },
  'button.padding.horizontal': {
    description: 'The horizontal padding.',
    type: 'string',
    defaultValue: '22px'
  },
  'button.padding.vertical': {
    description: 'The vertical padding.',
    type: 'string',
    defaultValue: '4px'
  },
  'button.primary.background.color': {
    description: "The color of the background for primary buttons.",
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.primary.background.opacity': {
    description: 'The value used for primary button background opacity.',
    type: 'number | string',
    defaultValue: undefined
  },
  'button.primary.border.color': {
    description: "The color of the border for primary buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.primary.color': {
    description: "The color of the label for primary buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.primary.font.weight': {
    description: "The weight of the text label for primary buttons.",
    type: 'string | number'
  },
  'button.primary.padding.horizontal': {
    description: 'The horizontal padding for a primary button.',
    type: 'string',
    defaultValue: '22px'
  },
  'button.primary.padding.vertical': {
    description: 'The vertical padding for a primary button.',
    type: 'string',
    defaultValue: '4px'
  },
  'button.primary.extend': {
    description: 'Any additional style for a primary button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined'
  },
  'button.secondary.background.color': {
    description: "The color of the background for secondary buttons.",
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'button.secondary.background.opacity': {
    description: 'The value used for secondary button background opacity.',
    type: 'number | string',
    defaultValue: undefined
  },
  'button.secondary.border.color': {
    description: "The color of the border for secondary buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.secondary.color': {
    description: "The color of the label for secondary buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.secondary.font.weight': {
    description: "The weight of the text label for secondary buttons.",
    type: 'string | number'
  },
  'button.secondary.padding.horizontal': {
    description: 'The horizontal padding for a secondary button.',
    type: 'string',
    defaultValue: '22px'
  },
  'button.secondary.padding.vertical': {
    description: 'The vertical padding for a secondary button.',
    type: 'string',
    defaultValue: '4px'
  },
  'button.secondary.extend': {
    description: 'Any additional style for a secondary button.',
    type: 'string | (props) => {}',
    defaultValue: 'undefined'
  },
  'button.size.small.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '18px'
  },
  'button.size.small.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '20px'
  },
  'button.size.small.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '4px'
  },
  'button.size.medium.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '18px'
  },
  'button.size.medium.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '22px'
  },
  'button.size.medium.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '4px'
  },
  'button.size.large.border.radius': {
    description: 'The border corner radius.',
    type: 'string',
    defaultValue: '24px'
  },
  'button.size.large.pad.horizontal': {
    description: 'The pad',
    type: 'string',
    defaultValue: '32px'
  },
  'button.size.large.pad.vertical': {
    description: 'The pad',
    type: 'string',
    defaultValue: '8px'
  },
  'button.transition.duration': {
    description: "The length of time it will take for the element to transition\nbetween two states.",
    type: 'number',
    defaultValue: 0.1
  },
  'button.transition.properties': {
    description: 'The CSS properties you want to add the transition to.',
    type: 'string[]',
    defaultValue: "['color', 'background-color', 'border-color', 'box-shadow']"
  },
  'button.transition.timing': {
    description: "Describes how a transition will progress over one cycle of its\nduration and allowing it to change speed during its course.",
    type: 'string',
    defaultValue: 'ease-in-out'
  },
  'button.extend': {
    description: 'Any additional style for the Button.',
    type: 'string | (props) => {}'
  },
  'tip.content': {
    description: 'When using tip prop, any valid Box property for the Tip container.',
    type: 'object',
    defaultValue: "{ background: 'background-contrast', elevation: 'small', \n    margin: 'xsmall', pad: { vertical: 'xsmall', horizontal: 'small' }, \n    round: 'small'}"
  },
  'tip.drop': {
    description: 'When using tip prop, any valid Drop property for the Tooltip.',
    type: 'object',
    defaultValue: "{align: { top: 'bottom' }}"
  }
}, themeDocUtils.focusStyle, themeDocUtils.disabledStyle);
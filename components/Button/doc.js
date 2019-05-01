"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Button) {
  var DocumentedButton = (0, _reactDesc.describe)(Button).availableAt((0, _utils.getAvailableAtBadge)('Button')).description('A button.').details("You can provide a single function child that will be called with\n      'hover' and 'focus' keys. This allows you to customize the rendering\n      of the Button in those cases.").usage("import { Button } from 'grommet';\n<Button primary={true} label='Label' />").intrinsicElement('button');
  DocumentedButton.propTypes = _extends({}, _utils.genericProps, {
    active: _reactDesc.PropTypes.bool.description('Whether the button is active.').defaultValue(false),
    color: _utils.colorPropType.description('Fill color for primary, label color for plain, border color otherwise.'),
    disabled: _reactDesc.PropTypes.bool.description('Whether the button is disabled.').defaultValue(false),
    fill: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['horizontal', 'vertical']), _reactDesc.PropTypes.bool]).description('Whether the button expands to fill all of the available width and/or height.').defaultValue(false),
    focusIndicator: _reactDesc.PropTypes.bool.description("Whether when 'plain' it should receive a focus outline.").defaultValue(true),
    hoverIndicator: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string, _reactDesc.PropTypes.oneOf(['background']), _reactDesc.PropTypes.shape({
      background: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string])
    })]).description("The hover indicator to apply when the user is mousing over the\nbutton. An object can be also be specified for color index support:\n{background: 'neutral-2'}. This prop is meant to be used only\nwith plain Buttons.").defaultValue(false),
    href: _reactDesc.PropTypes.string.description('If specified, the button will behave like an anchor tag.'),
    icon: _reactDesc.PropTypes.element.description('Icon element to place in the button.'),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The amount of spacing between icon and label in the button.").defaultValue('small'),
    label: _reactDesc.PropTypes.node.description('Label text to place in the button.'),
    onClick: _reactDesc.PropTypes.func.description("Click handler. Not setting this property and not specifying a href\ncauses the Button to be disabled."),
    plain: _reactDesc.PropTypes.bool.description("Whether this is a plain button with no border or pad. \nNon plain button will show both pad and border. \nThe plain button has no border and unless the icon prop exist it has no pad as well.").defaultValue(false),
    primary: _reactDesc.PropTypes.bool.description('Whether this is a primary button. There should be at most one per page or screen.').defaultValue(false),
    reverse: _reactDesc.PropTypes.bool.description("Whether an icon and label should be reversed so that the icon is at the\nend of the anchor.").defaultValue(false),
    type: _reactDesc.PropTypes.oneOf(['button', 'reset', 'submit']).description('The type of button. Set the type to submit for the default button on forms.').defaultValue('button'),
    as: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description("The DOM tag or react component to use for the element.")
  });
  return DocumentedButton;
};

exports.doc = doc;

var themeDoc = _extends({
  'global.hover.color': {
    description: 'The background color when hovering.',
    type: 'string',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'global.edgeSize.small': {
    description: 'The padding around an icon-only button.',
    type: 'string',
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
  'button.primary.color': {
    description: "The color of the background for primary buttons.",
    type: 'string | { dark: string, light: string }'
  },
  'button.disabled.opacity': {
    description: 'The opacity when the button is disabled.',
    type: 'number',
    defaultValue: 0.3
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
  'button.extend': {
    description: 'Any additional style for the Button.',
    type: 'string | (props) => {}'
  }
}, _utils.themeDocUtils.focusStyle, _utils.themeDocUtils.disabledStyle);

exports.themeDoc = themeDoc;
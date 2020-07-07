function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge, themeDocUtils } from '../../utils';
export var doc = function doc(TextInput) {
  var DocumentedTextInput = describe(TextInput).availableAt(getAvailableAtBadge('TextInput')).description('A control to input a single line of text, with optional suggestions.').usage("import { TextInput } from 'grommet';\n<TextInput id='item' name='item' />").intrinsicElement('input');
  DocumentedTextInput.propTypes = {
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }).description('How to align the drop.').defaultValue({
      top: 'bottom',
      left: 'left'
    }),
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The height of the drop container.'),
    dropTarget: PropTypes.object.description("Target where any suggestions drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the TextInput itself by default."),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    icon: PropTypes.element.description("An optional icon to show. This could be used to provide an\n      indication of what kind of input is expected, like an email icon,\n      or what the input will be used for, like a search icon."),
    id: PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: PropTypes.bool.description('Whether the plain text input should receive a focus outline.'),
    messages: PropTypes.shape({
      enterSelect: PropTypes.string,
      suggestionsCount: PropTypes.string,
      suggestionsExist: PropTypes.string,
      suggestionIsOpen: PropTypes.string
    }).description("Custom messages for TextInput. Used for accessibility by screen\n        readers.").defaultValue({
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
    }),
    name: PropTypes.string.description("The name of the attribute when in a Form or FormField."),
    onChange: PropTypes.func.description('Function that will be called when the user types in the input.'),
    onSelect: PropTypes.func.description("Function that will be called when the user selects a suggestion.\nThe suggestion contains the object chosen from the supplied suggestions."),
    onSuggestionsOpen: PropTypes.func.description('Function that will be called when the suggestions drop is opened.'),
    onSuggestionsClose: PropTypes.func.description('Function that will be called when the suggestions drop is closed.'),
    placeholder: PropTypes.node.description('Placeholder to use when no value is provided.'),
    plain: PropTypes.bool.description("Whether this is a plain input with no border or padding.\nOnly use this when the containing context provides sufficient affordance"),
    reverse: PropTypes.bool.description("Whether an icon should be reversed so that the icon is at the\n      end of the input."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the TextInput.'),
    suggestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      label: PropTypes.node,
      // eslint-disable-next-line
      value: PropTypes.any // this is intentional any

    }), PropTypes.string])).description("Suggestions to show. It is recommended to avoid showing too many\nsuggestions and instead rely on the user to type more."),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).description('What text to put in the input.')
  };
  return DocumentedTextInput;
};
export var themeDoc = _extends({
  'global.colors.border': {
    description: 'The color of the border.',
    type: 'object',
    defaultValue: {
      dark: 'rgba(255, 255, 255, 0.33)',
      light: 'rgba(0, 0, 0, 0.33)'
    }
  },
  'global.control.border.color': {
    description: 'The border color.',
    type: 'string',
    defaultValue: 'border'
  },
  'global.control.border.radius': {
    description: 'The border radius.',
    type: 'string',
    defaultValue: '4px'
  },
  'global.control.border.width': {
    description: 'The border width.',
    type: 'string',
    defaultValue: '1px'
  },
  'select.step': {
    description: 'How many suggestions to render at a time.',
    type: 'number',
    defaultValue: 20
  },
  text: {
    description: "The possible sizes of the text in terms of its font-size and\n    line-height.",
    type: 'object',
    defaultValue: "{\n      xsmall: {\n        size: '12px',\n        height: '18px',\n       },\n      small: {\n        size: '14px',\n        height: '20px',\n       },\n      medium: {\n        size: '18px',\n        height: '24px',\n      },\n      large: {\n        size: '22px',\n        height: '28px',\n      },\n      xlarge: {\n        size: '26px',\n        height: '32px',\n      },\n      xxlarge: {\n        size: '34px',\n        height: '40px',\n      },\n    }"
  },
  'textInput.extend': {
    description: 'Any additional style for TextInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'textInput.container.extend': {
    description: 'Any additional style for TextInput container.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'textInput.placeholder.extend': {
    description: 'Any additional style for non-string placeholder inside TextInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'textInput.suggestions.extend': {
    description: 'Any additional style for TextInput suggestions.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'textInput.disabled.opacity': {
    description: 'The opacity when the textInput is disabled.',
    type: 'number | string',
    defaultValue: undefined
  }
}, themeDocUtils.focusStyle, themeDocUtils.placeholderStyle, themeDocUtils.disabledStyle, themeDocUtils.inputStyle);
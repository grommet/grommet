"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(TextInput) {
  var DocumentedTextInput = (0, _reactDesc.describe)(TextInput).availableAt((0, _mixins.getAvailableAtBadge)('TextInput', 'Input')).description('A control to input a single line of text, with optional suggestions.').usage("import { TextInput } from 'grommet';\n<TextInput id='item' name='item' />").intrinsicElement('input');
  DocumentedTextInput.propTypes = {
    a11yTitle: _reactDesc.PropTypes.string.description('Custom title to be used by screen readers.'),
    defaultSuggestion: _reactDesc.PropTypes.number.description("Default suggestion to highlight, as an index into the suggestions array.\n\n      If set, the suggestion at the specified index in the suggestions array\n      will be highlighted by default when the suggestions drop opens.\n      "),
    dropAlign: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      bottom: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      right: _reactDesc.PropTypes.oneOf(['left', 'right']),
      left: _reactDesc.PropTypes.oneOf(['left', 'right'])
    }).description('How to align the drop.').defaultValue({
      top: 'bottom',
      left: 'left'
    }),
    dropHeight: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The height of the drop container.'),
    dropTarget: _reactDesc.PropTypes.object.description("Target where any suggestions drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the TextInput itself by default."),
    dropProps: _reactDesc.PropTypes.object.description('Any valid Drop prop.'),
    icon: _reactDesc.PropTypes.element.description("An optional icon to show. This could be used to provide an\n      indication of what kind of input is expected, like an email icon,\n      or what the input will be used for, like a search icon."),
    id: _reactDesc.PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: _reactDesc.PropTypes.bool.description('Whether the plain TextInput should receive a focus outline.'),
    messages: _reactDesc.PropTypes.shape({
      enterSelect: _reactDesc.PropTypes.string,
      suggestionsCount: _reactDesc.PropTypes.string,
      suggestionsExist: _reactDesc.PropTypes.string,
      suggestionIsOpen: _reactDesc.PropTypes.string
    }).description("Custom messages for TextInput. Used for accessibility by screen\n        readers.").defaultValue({
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
    }),
    name: _reactDesc.PropTypes.string.description("The name of the attribute when in a Form or FormField."),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when the user types in the input.'),
    onSelect: _reactDesc.PropTypes.func.description("Note: This function is deprecated, use onSuggestionSelect instead.\n      Function that will be called when the user selects a suggestion.\n      The suggestion contains the object chosen from the supplied suggestions.\n      When used in conjunction with onSuggestionSelect\n      this will default to React's onSelect"),
    onSuggestionSelect: _reactDesc.PropTypes.func.description("Function that will be called when the user selects a suggestion.\n      The suggestion contains the object chosen from the supplied suggestions."),
    onSuggestionsOpen: _reactDesc.PropTypes.func.description('Function that will be called when the suggestions drop is opened.'),
    onSuggestionsClose: _reactDesc.PropTypes.func.description('Function that will be called when the suggestions drop is closed.'),
    placeholder: _reactDesc.PropTypes.node.description('Placeholder to use when no value is provided.'),
    plain: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['full'])]).description("Whether this is a plain input with no border or outline.\n      Use \"full\" to remove padding in addition to removing border and outline.\n      Only use this when the containing context provides sufficient\n      affordance."),
    reverse: _reactDesc.PropTypes.bool.description("Whether an icon should be reversed so that the icon is at the\n      end of the input."),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the TextInput.'),
    suggestions: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.shape({
      label: _reactDesc.PropTypes.node,
      // eslint-disable-next-line
      value: _reactDesc.PropTypes.any // this is intentional any

    }), _reactDesc.PropTypes.string])).description("Suggestions to show. It is recommended to avoid showing too many\nsuggestions and instead rely on the user to type more."),
    textAlign: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the input.').defaultValue('start'),
    value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.number]).description('What text to put in the input.')
  };
  return DocumentedTextInput;
};

exports.doc = doc;

var themeDoc = _extends({
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
}, _themeDocUtils.themeDocUtils.focusStyle, _themeDocUtils.themeDocUtils.placeholderStyle, _themeDocUtils.themeDocUtils.disabledStyle, _themeDocUtils.themeDocUtils.inputStyle);

exports.themeDoc = themeDoc;
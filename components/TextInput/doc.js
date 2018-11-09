"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(TextInput) {
  var DocumentedTextInput = (0, _reactDesc.describe)(TextInput).availableAt((0, _utils.getAvailableAtBadge)('TextInput')).description('A text input field with optional suggestions.').usage("import { TextInput } from 'grommet';\n<TextInput id='item' name='item' />");
  DocumentedTextInput.propTypes = {
    dropAlign: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      bottom: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      right: _reactDesc.PropTypes.oneOf(['left', 'right']),
      left: _reactDesc.PropTypes.oneOf(['left', 'right'])
    }).description('How to align the drop.').defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropTarget: _reactDesc.PropTypes.object.description("Target where any suggestions drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the TextInput itself by default."),
    id: _reactDesc.PropTypes.string.description('The id attribute of the input.'),
    focusIndicator: _reactDesc.PropTypes.bool.description('Whether the plain text input should receive a focus outline.'),
    messages: _reactDesc.PropTypes.shape({
      enterSelect: _reactDesc.PropTypes.string,
      suggestionsCount: _reactDesc.PropTypes.string,
      suggestionsExist: _reactDesc.PropTypes.string,
      suggestionIsOpen: _reactDesc.PropTypes.string
    }).description('Custom messages for TextInput. Used for accessibility by screen readers.').defaultValue({
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
    }),
    name: _reactDesc.PropTypes.string.description('The name attribute of the input.'),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when the user types in the input.'),
    onSelect: _reactDesc.PropTypes.func.description("Function that will be called when the user selects a suggestion.\nThe suggestion contains the object chosen from the supplied suggestions."),
    onSuggestionsOpen: _reactDesc.PropTypes.func.description('Function that will be called when the suggestions drop is opened.'),
    onSuggestionsClose: _reactDesc.PropTypes.func.description('Function that will be called when the suggestions drop is closed.'),
    placeholder: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Placeholder to use when no value is provided.'),
    plain: _reactDesc.PropTypes.bool.description("Whether this is a plain input with no border or padding.\nOnly use this when the containing context provides sufficient affordance"),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the TextInput.'),
    suggestions: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.shape({
      label: _reactDesc.PropTypes.node,
      value: _reactDesc.PropTypes.any
    }), _reactDesc.PropTypes.string])).description("Suggestions to show. It is recommended to avoid showing too many\nsuggestions and instead rely on the user to type more."),
    value: _reactDesc.PropTypes.string.description('What text to put in the input.')
  };
  return DocumentedTextInput;
};

exports.doc = doc;
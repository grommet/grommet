"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(TextArea) {
  var DocumentedTextArea = (0, _reactDesc.describe)(TextArea).availableAt((0, _utils.getAvailableAtBadge)('TextArea')).description('A control to input multiple lines of text.').usage("import { TextArea } from 'grommet';\n<TextArea id='item' name='item' />").intrinsicElement('textarea');
  DocumentedTextArea.propTypes = {
    id: _reactDesc.PropTypes.string.description('The id attribute of the textarea.'),
    fill: _reactDesc.PropTypes.bool.description('Whether the width and height should fill the container.').defaultValue(false),
    focusIndicator: _reactDesc.PropTypes.bool.description('Whether the plain textarea should receive a focus outline.'),
    name: _reactDesc.PropTypes.string.description('The name attribute of the textarea.'),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when the user types in the textarea.'),
    placeholder: _reactDesc.PropTypes.string.description('Placeholder text to use when no value is provided.'),
    plain: _reactDesc.PropTypes.bool.description("Whether this is a plain textarea with no border or padding.\nOnly use this when the containing context provides sufficient affordance."),
    value: _reactDesc.PropTypes.string.description('What text to put in the textarea.'),
    resize: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['vertical', 'horizontal']), _reactDesc.PropTypes.bool]).description('Whether user is allowed to resize the textarea.').defaultValue(true)
  };
  return DocumentedTextArea;
};

exports.doc = doc;
var themeDoc = {
  'global.colors.placeholder': {
    description: 'The placeholder color used for TextArea.',
    type: 'string',
    defaultValue: '#AAAAAA'
  },
  'global.control.border.width': {
    description: 'The border width.',
    type: 'string',
    defaultValue: '1px'
  },
  'global.input.weight': {
    description: 'The font weight of the text entered.',
    type: 'number',
    defaultValue: 600
  },
  'global.focus.border.color': {
    description: "The color of the border when component is focused.",
    type: 'string | { dark: string, light: string }',
    defaultValue: 'focus'
  },
  'global.input.padding': {
    description: 'The padding of the text.',
    type: 'string',
    defaultValue: '12px'
  },
  'textArea.extend': {
    description: 'Any additional style for Text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;
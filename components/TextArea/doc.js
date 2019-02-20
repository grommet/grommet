"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var themeDoc = _extends({
  'textArea.extend': {
    description: 'Any additional style for Text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.control.border': {
    description: 'The border of the textarea.',
    type: 'object',
    defaultValue: {
      width: '1px',
      radius: '4px',
      color: 'border'
    }
  },
  'global.colors.border': {
    description: 'The color of the borders',
    type: 'object',
    defaultValue: {
      dark: 'rgba(255, 255, 255, 0.33)',
      light: 'rgba(0, 0, 0, 0.33)'
    }
  }
}, _utils.themeDocUtils.focusStyle, _utils.themeDocUtils.placeholderStyle, _utils.themeDocUtils.inputStyle);

exports.themeDoc = themeDoc;
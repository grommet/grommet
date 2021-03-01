"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(TextArea) {
  var DocumentedTextArea = (0, _reactDesc.describe)(TextArea).availableAt((0, _mixins.getAvailableAtBadge)('TextArea', 'Input')).description('A control to input multiple lines of text.').usage("import { TextArea } from 'grommet';\n<TextArea id='item' name='item' />").intrinsicElement('textarea');
  DocumentedTextArea.propTypes = {
    a11yTitle: _reactDesc.PropTypes.string.description("Custom label to be used by screen readers.\n      When provided, an aria-label will be added to the element."),
    id: _reactDesc.PropTypes.string.description('The id attribute of the textarea.'),
    fill: _reactDesc.PropTypes.bool.description('Whether the width and height should fill the container.').defaultValue(false),
    focusIndicator: _reactDesc.PropTypes.bool.description('Whether the plain TextArea should receive a focus outline.'),
    name: _reactDesc.PropTypes.string.description('The name attribute of the textarea.'),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when the user types in the textarea.'),
    placeholder: _reactDesc.PropTypes.string.description('Placeholder text to use when no value is provided.'),
    plain: _reactDesc.PropTypes.bool.description("Whether this is a plain textarea with no border or padding.\nOnly use this when the containing context provides sufficient affordance."),
    value: _reactDesc.PropTypes.string.description('What text to put in the textarea.'),
    resize: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['vertical', 'horizontal']), _reactDesc.PropTypes.bool]).description('Whether user is allowed to resize the textarea.').defaultValue(true),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the TextArea.')
  };
  return DocumentedTextArea;
};

exports.doc = doc;

var themeDoc = _extends({
  'global.colors.border': {
    description: 'The color of the border.',
    type: 'string | { dark: string, light: string }',
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
  'textArea.extend': {
    description: 'Any additional style for Text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'textArea.disabled.opacity': {
    description: 'The opacity when the textArea is disabled.',
    type: 'number',
    defaultValue: 0.3
  }
}, _themeDocUtils.themeDocUtils.focusStyle, _themeDocUtils.themeDocUtils.placeholderStyle, _themeDocUtils.themeDocUtils.inputStyle, _themeDocUtils.themeDocUtils.disabledStyle);

exports.themeDoc = themeDoc;
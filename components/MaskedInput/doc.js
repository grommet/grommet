"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(MaskedInput) {
  var DocumentedMaskedInput = (0, _reactDesc.describe)(MaskedInput).availableAt((0, _utils.getAvailableAtBadge)('MaskedInput')).description('An input field with formalized syntax.').usage("import { MaskedInput } from 'grommet';\n<MaskedInput id='item' name='item' />").intrinsicElement('input');
  DocumentedMaskedInput.propTypes = {
    id: _reactDesc.PropTypes.string.description('The id attribute of the input.'),
    name: _reactDesc.PropTypes.string.description('The name attribute of the input.'),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user types or pastes text."),
    onBlur: _reactDesc.PropTypes.func.description("Function that will be called when the user leaves the field."),
    mask: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      length: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)]),
      fixed: _reactDesc.PropTypes.string,
      options: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string),
      regexp: _reactDesc.PropTypes.shape({}) // RegExp

    })).description("Describes the structure of the mask. If a regexp is provided, it should\n      allow both the final full string element as well as partial strings\n      as the user types characters one by one."),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the text.'),
    value: _reactDesc.PropTypes.string.description("What text to put in the input. The caller should ensure that it\n      is initially valid with respect to the mask.")
  };
  return DocumentedMaskedInput;
};

exports.doc = doc;

var themeDoc = _extends({
  'maskedInput.extend': {
    description: 'Any additional style for MaskedInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'text.medium': {
    description: 'The size of the text for MaskedInput.',
    type: 'string',
    defaultValue: '18px'
  }
}, _utils.themeDocUtils.focusStyle, _utils.themeDocUtils.placeholderStyle, _utils.themeDocUtils.inputStyle);

exports.themeDoc = themeDoc;
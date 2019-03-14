function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge, themeDocUtils } from '../../utils';
export var doc = function doc(MaskedInput) {
  var DocumentedMaskedInput = describe(MaskedInput).availableAt(getAvailableAtBadge('MaskedInput')).description('An input field with formalized syntax.').usage("import { MaskedInput } from 'grommet';\n<MaskedInput id='item' name='item' />").intrinsicElement('input');
  DocumentedMaskedInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the input.'),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description("Function that will be called when the user types or pastes text."),
    onBlur: PropTypes.func.description("Function that will be called when the user leaves the field."),
    mask: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
      fixed: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      regexp: PropTypes.shape({}) // RegExp

    })).description("Describes the structure of the mask. If a regexp is provided, it should\n      allow both the final full string element as well as partial strings\n      as the user types characters one by one."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the text.'),
    value: PropTypes.string.description("What text to put in the input. The caller should ensure that it\n      is initially valid with respect to the mask.")
  };
  return DocumentedMaskedInput;
};
export var themeDoc = _extends({
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
}, themeDocUtils.focusStyle, themeDocUtils.placeholderStyle, themeDocUtils.inputStyle);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';
export var doc = function doc(MaskedInput) {
  var DocumentedMaskedInput = describe(MaskedInput).availableAt(getAvailableAtBadge('MaskedInput', 'Input')).description('An input field with formalized syntax.').usage("import { MaskedInput } from 'grommet';\n<MaskedInput id='item' name='item' />").intrinsicElement('input');
  DocumentedMaskedInput.propTypes = {
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The height of the drop container.'),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    icon: PropTypes.element.description("An optional icon to show. This could be used to provide an\n      indication of what kind of input is expected, like an email icon,\n      or what the input will be used for, like a search icon."),
    id: PropTypes.string.description('The id attribute of the input.'),
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description("Function that will be called when the user types or pastes text."),
    onBlur: PropTypes.func.description("Function that will be called when the user leaves the field."),
    mask: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
      fixed: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      regexp: PropTypes.shape({}) // RegExp

    })).description("Describes the structure of the mask. If a regexp is provided, it should\n      allow both the final full string element as well as partial strings\n      as the user types characters one by one. When using regexp to match number\n      values make sure that the option values are numbers as well."),
    reverse: PropTypes.bool.description("Whether an icon should be reversed so that the icon is at the\n      end of the input."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the text.'),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).description("What text to put in the input. The caller should ensure that it\n      is initially valid with respect to the mask.")
  };
  return DocumentedMaskedInput;
};
export var themeDoc = _extends({
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
  'maskedInput.extend': {
    description: 'Any additional style for MaskedInput.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'maskedInput.container.extend': {
    description: "Any additional style for the container surrounding the input \n    and, if present, icon.",
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'text.medium': {
    description: 'The size of the text for MaskedInput.',
    type: 'string',
    defaultValue: '18px'
  },
  'maskedInput.disabled.opacity': {
    description: 'The opacity when the MaskedInput is disabled.',
    type: 'number | string',
    defaultValue: undefined
  }
}, themeDocUtils.disabledStyle, themeDocUtils.focusStyle, themeDocUtils.placeholderStyle, themeDocUtils.inputStyle);
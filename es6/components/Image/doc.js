function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Image) {
  var DocumentedImage = describe(Image).availableAt(getAvailableAtBadge('Image', 'Media')).description('An image.').usage("import { Image } from 'grommet';\n<Image/>").intrinsicElement('img');
  DocumentedImage.propTypes = _extends({}, genericProps, {
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    fit: PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.'),
    fallback: PropTypes.string.description("Specifies the URL of the fallback image used when \n      src is failing to load"),
    opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.string, PropTypes.bool]).description('Transparency of the image.')
  });
  return DocumentedImage;
};
export var themeDoc = {
  'global.opacity.medium': {
    description: 'The value used when opacity is set to true.',
    type: 'number',
    defaultValue: '0.4'
  },
  'image.extend': {
    description: 'Any additional style for the Image.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
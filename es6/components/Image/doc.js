function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var themeDoc = {
  'image.extend': {
    description: 'Any additional style for the Image.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
export var doc = function doc(Image) {
  var DocumentedImage = describe(Image).availableAt(getAvailableAtBadge('Image')).description('An image.').usage("import { Image } from 'grommet';\n<Image/>");
  DocumentedImage.propTypes = _extends({}, genericProps, {
    fit: PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.')
  });
  return DocumentedImage;
};
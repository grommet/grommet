"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Image) {
  var DocumentedImage = (0, _reactDesc.describe)(Image).availableAt((0, _utils.getAvailableAtBadge)('Image')).description('An image.').usage("import { Image } from 'grommet';\n<Image/>").intrinsicElement('img');
  DocumentedImage.propTypes = _extends({}, _utils.genericProps, {
    fit: _reactDesc.PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.'),
    fallback: _reactDesc.PropTypes.string.description('Specifies the URL of the fallback image used when src is failing to load'),
    opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.bool]).description('Transparency of the image.')
  });
  return DocumentedImage;
};

exports.doc = doc;
var themeDoc = {
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
exports.themeDoc = themeDoc;
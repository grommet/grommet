"use strict";

exports.__esModule = true;
exports.doc = exports.themeDoc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var themeDoc = {
  'image.extend': {
    description: 'Any additional style for the Image.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;

var doc = function doc(Image) {
  var DocumentedImage = (0, _reactDesc.describe)(Image).availableAt((0, _utils.getAvailableAtBadge)('Image')).description('An image.').usage("import { Image } from 'grommet';\n<Image/>");
  DocumentedImage.propTypes = _extends({}, _utils.genericProps, {
    fit: _reactDesc.PropTypes.oneOf(['cover', 'contain']).description('How the image fills its container.')
  });
  return DocumentedImage;
};

exports.doc = doc;
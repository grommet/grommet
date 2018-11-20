"use strict";

exports.__esModule = true;
exports.Image = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _StyledImage = require("./StyledImage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image(props) {
  return _react.default.createElement(_StyledImage.StyledImage, props);
};

var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

var ImageWrapper = (0, _recompose.compose)(_hocs.withTheme)(ImageDoc || Image);
exports.Image = ImageWrapper;
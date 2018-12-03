"use strict";

exports.__esModule = true;
exports.Image = void 0;

var _StyledImage = require("./StyledImage");

var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(_StyledImage.StyledImage); // eslint-disable-line global-require
}

var ImageWrapper = ImageDoc || _StyledImage.StyledImage;
exports.Image = ImageWrapper;
ImageWrapper.displayName = 'Image';
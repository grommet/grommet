import { StyledImage } from './StyledImage';
var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(StyledImage); // eslint-disable-line global-require
}

var ImageWrapper = ImageDoc || StyledImage;
ImageWrapper.displayName = 'Image';
export { ImageWrapper as Image };
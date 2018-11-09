import React from 'react';
import { compose } from 'recompose';
import { withTheme } from '../hocs';
import { StyledImage } from './StyledImage';

var Image = function Image(props) {
  return React.createElement(StyledImage, props);
};

var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

var ImageWrapper = compose(withTheme)(ImageDoc || Image);
export { ImageWrapper as Image };
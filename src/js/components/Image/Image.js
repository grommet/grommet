import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledImage } from './StyledImage';

const Image = props => <StyledImage {...props} />;

let ImageDoc;
if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}
const ImageWrapper = compose(withTheme)(ImageDoc || Image);

export { ImageWrapper as Image };

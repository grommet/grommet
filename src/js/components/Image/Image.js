import React from 'react';
import PropTypes from 'prop-types';
import { StyledImage } from './StyledImage';

let ImageDoc;
if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(StyledImage); // eslint-disable-line global-require
}
const ImageWrapper = ImageDoc || StyledImage;
ImageWrapper.displayName = 'Image';

/* HOC for UXPin Merge */
const Image = (props) => <StyledImage {...props} />;

Image.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  fit: PropTypes.oneOf(["cover", "contain"]),
  src: PropTypes.string,
  style: PropTypes.object,
}

export { ImageWrapper as Image };
/* Export for UXPin Merge */
export default Image;
import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledImage from './StyledImage';
import doc from './doc';

class Image extends Component {
  render() {
    return (
      <StyledImage {...this.props} />
    );
  }
}

export default compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Image) : Image
);

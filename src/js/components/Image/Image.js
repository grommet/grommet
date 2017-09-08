import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledImage from './StyledImage';

import { withTheme } from '../hocs';

import doc from './doc';

class Image extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledImage {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Image);
}

export default compose(
  withTheme,
)(Image);

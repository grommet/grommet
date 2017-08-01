import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledParagraph from './StyledParagraph';

import { withTheme } from '../hocs';

import doc from './doc';

class Paragraph extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledParagraph {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Paragraph);
}

export default compose(
  withTheme,
)(Paragraph);

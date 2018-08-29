import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledParagraph } from './StyledParagraph';

class Paragraph extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledParagraph {...rest} />
    );
  }
}

let ParagraphDoc;
if (process.env.NODE_ENV !== 'production') {
  ParagraphDoc = require('./doc').doc(Paragraph); // eslint-disable-line global-require
}
const ParagraphWrapper = compose(
  withTheme,
)(ParagraphDoc || Paragraph);

export { ParagraphWrapper as Paragraph };

import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledParagraph } from './StyledParagraph';
import { doc } from './doc';

class Paragraph extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledParagraph {...rest} />
    );
  }
}

let ParagraphWrapper = Paragraph;
if (process.env.NODE_ENV !== 'production') {
  ParagraphWrapper = doc(ParagraphWrapper);
}

ParagraphWrapper = compose(
  withTheme,
)(ParagraphWrapper);

export { ParagraphWrapper as Paragraph };

import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledParagraph } from './StyledParagraph';
import { documentParagraph } from './doc';

class Paragraph extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <StyledParagraph {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  documentParagraph(Paragraph);
}

export const ParagraphWrapper = compose(
  withTheme,
)(Paragraph);

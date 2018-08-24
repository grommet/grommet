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

const ParagraphWrapper = compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Paragraph) : Paragraph
);

export { ParagraphWrapper as Paragraph };

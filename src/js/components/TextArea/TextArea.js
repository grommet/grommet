import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledTextArea from './StyledTextArea';
import doc from './doc';

class TextArea extends Component {
  render() {
    return (
      <StyledTextArea {...this.props} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(TextArea);
}

export default compose(
  withTheme,
)(TextArea);

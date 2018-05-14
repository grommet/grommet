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

const WrappedTextArea = compose(
  withTheme,
)(TextArea);

export default React.forwardRef((props, ref) =>
  <WrappedTextArea innerRef={ref} {...props} />);

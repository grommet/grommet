import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledTextArea from './StyledTextArea';
import doc from './doc';

class TextArea extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
    theme: PropTypes.object,
  }

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

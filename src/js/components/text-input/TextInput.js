import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledTextInput from './StyledTextInput';

import { withFocus, withTheme } from '../hocs';

import doc from './doc';

function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
}

class TextInput extends Component {
  render() {
    const { defaultValue, value } = this.props;
    return (
      <StyledTextInput
        autoComplete='off'
        {...this.props}
        defaultValue={renderLabel(defaultValue)}
        value={renderLabel(value)}
      />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(TextInput);
}

export default compose(
  withFocus,
  withTheme,
)(TextInput);

import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledText from './StyledText';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  span: StyledText,
}; // tag -> styled component

class Text extends Component {
  static defaultProps = {
    level: 1,
    tag: 'span',
  };

  render() {
    const {
      tag,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledText.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Text);
}

export default compose(
  withTheme,
)(Text);

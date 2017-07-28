import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledBox from './StyledBox';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  div: StyledBox,
}; // tag -> styled component

class Box extends Component {

  static defaultProps = {
    tag: 'div',
  };

  render() {
    const {
      tag,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledBox.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Box);
}

export default compose(
  withTheme,
)(Box);

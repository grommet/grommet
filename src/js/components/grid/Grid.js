import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledGrid from './StyledGrid';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  div: StyledGrid,
}; // tag -> styled component

class Grid extends Component {
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
      StyledComponent = StyledGrid.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Grid);
}

export default compose(
  withTheme,
)(Grid);

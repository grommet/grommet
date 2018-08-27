import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledGrid } from './StyledGrid';
import { doc } from './doc';

const styledComponents = {
  div: StyledGrid,
}; // tag -> styled component

class Grid extends Component {
  static defaultProps = {
    tag: 'div',
  };

  render() {
    const {
      fill, // munged to avoid styled-components putting it in the DOM
      rows, // munged to avoid styled-components putting it in the DOM
      tag,
      ...rest
    } = this.props;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledGrid.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    return (
      <StyledComponent
        fillContainer={fill}
        rowsProp={rows}
        {...rest}
      />
    );
  }
}

const GridWrapper = compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Grid) : Grid
);

GridWrapper.available = (typeof window !== 'undefined') &&
  window.CSS && window.CSS.supports &&
  window.CSS.supports('display', 'grid');

export { GridWrapper as Grid };

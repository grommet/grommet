import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledAnchor from './StyledAnchor';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  a: StyledAnchor,
}; // tag -> styled component

class Anchor extends Component {
  static defaultProps = {
    tag: 'a',
  };

  render() {
    const {
      tag,
      ...rest
    } = this.props;

    const StyledComponent = styledComponents[tag]
      ? styledComponents[tag]
      : StyledAnchor.withComponent(tag);

    return (
      <StyledComponent {...rest} />
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Anchor);
}

export default compose(
  withTheme,
)(Anchor);

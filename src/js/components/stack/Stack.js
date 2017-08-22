import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledStack from './StyledStack';

import { withTheme } from '../hocs';

import doc from './doc';

class Stack extends Component {
  render() {
    const { children, ...rest } = this.props;

    // make all children but the first absolutely positioned
    const styledChildren = React.Children.map(children, (child, index) => {
      if (index === 0) {
        return child;
      }
      return React.cloneElement(child, {
        style: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          overflow: 'hidden',
        },
      });
    });

    return (
      <StyledStack {...rest}>
        {styledChildren}
      </StyledStack>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Stack);
}

export default compose(
  withTheme,
)(Stack);

import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledStack from './StyledStack';

import { withTheme } from '../hocs';

import doc from './doc';

import styleMap from './styleMap';

class Stack extends Component {
  static defaultProps = {
    anchor: 'center',
  };

  render() {
    const { anchor, children, ...rest } = this.props;

    // make all children but the first absolutely positioned
    const styledChildren = React.Children.map(children, (child, index) => {
      if (index === 0) {
        return child;
      }
      const style = {
        position: 'absolute',
        overflow: 'hidden',
        ...styleMap[anchor],
      };
      return React.cloneElement(child, { style });
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

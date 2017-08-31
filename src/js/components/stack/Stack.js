import React, { Component } from 'react';
import { compose } from 'recompose';

import StyledStack from './StyledStack';

import { withTheme } from '../hocs';

import doc from './doc';

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
      };
      if (anchor === 'center') {
        style.top = '50%';
        style.left = '50%';
        style.transform = 'translate(-50%, -50%)';
      } else if (anchor === 'left') {
        style.top = '50%';
        style.left = '0';
        style.transform = 'translateY(-50%)';
      } else if (anchor === 'right') {
        style.top = '50%';
        style.right = '0';
        style.transform = 'translateY(-50%)';
      } else if (anchor === 'top') {
        style.top = '0';
        style.right = '50%';
        style.transform = 'translateX(-50%)';
      } else if (anchor === 'bottom') {
        style.top = '0';
        style.right = '50%';
        style.transform = 'translateX(-50%)';
      } else if (anchor === 'top-left') {
        style.top = '0';
        style.left = '0';
      } else if (anchor === 'bottom-left') {
        style.bottom = '0';
        style.left = '0';
      } else if (anchor === 'top-right') {
        style.top = '0';
        style.right = '0';
      } else if (anchor === 'bottom-right') {
        style.bottom = '0';
        style.right = '0';
      }
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

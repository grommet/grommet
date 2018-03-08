import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledStack from './StyledStack';
import doc from './doc';
import styleMap from './styleMap';

class Stack extends Component {
  render() {
    const { anchor, children, fill, guidingChild, ...rest } = this.props;

    // make all children but the first absolutely positioned
    const lastIndex = React.Children.count(children) - 1;
    let guidingIndex = guidingChild;
    if (guidingIndex === 'first' || !guidingIndex) {
      guidingIndex = 0;
    } else if (guidingIndex === 'last') {
      guidingIndex = lastIndex;
    }
    const styledChildren = Children.map(children, (child, index) => {
      if (child) {
        if (index === guidingIndex) {
          const style = {
            ...(child.props || {}).style,
            position: 'relative',
          };
          if (fill) {
            style.flex = '1 1';
          }
          return cloneElement(child, { style });
        }

        const style = {
          ...(child.props || {}).style,
          position: 'absolute',
          overflow: 'hidden',
          ...styleMap[anchor || 'fill'],
        };
        return cloneElement(child, { style });
      }

      return child;
    });

    return (
      <StyledStack fillContainer={fill} {...rest}>
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

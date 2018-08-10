import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledStack, { StyledStackLayer } from './StyledStack';
import doc from './doc';

class Stack extends Component {
  render() {
    const { anchor, children, fill, guidingChild, ...rest } = this.props;

    // make all children but the first absolutely positioned
    let guidingIndex = guidingChild;
    if (guidingIndex === 'first' || !guidingIndex) {
      guidingIndex = 0;
    } else if (guidingIndex === 'last') {
      guidingIndex = React.Children.count(children) - 1;
    }
    let childIndex = 0;
    const styledChildren = Children.map(children, (child) => {
      if (child) {
        let layer = <StyledStackLayer anchor={anchor} fill={fill}>{child}</StyledStackLayer>;
        if (childIndex === guidingIndex) {
          layer = <StyledStackLayer guiding={true} fill={fill}>{child}</StyledStackLayer>;
        }
        childIndex += 1;
        return layer;
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

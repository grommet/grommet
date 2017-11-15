import React, { cloneElement, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import StyledStack from './StyledStack';
import doc from './doc';
import styleMap from './styleMap';

class Stack extends Component {
  render() {
    const { anchor, children, ...rest } = this.props;

    // make all children but the first absolutely positioned
    const styledChildren = React.Children.map(children, (child, index) => {
      if (index === 0) {
        return child;
      }

      if (child) {
        const style = {
          position: 'absolute',
          overflow: 'hidden',
          ...styleMap[anchor || 'fill'],
        };
        return cloneElement(child, { style });
      }

      return child;
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

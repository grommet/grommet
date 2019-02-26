import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { StyledStack, StyledStackLayer } from './StyledStack';

class Stack extends Component {
  toChildIndex = child => {
    const { children } = this.props;
    let index = child;
    if (index === 'first' || !index) {
      index = 0;
    } else if (index === 'last') {
      index = React.Children.count(children) - 1;
    }
    return index;
  };

  render() {
    const {
      anchor,
      children,
      fill,
      guidingChild,
      interactiveChild,
      ...rest
    } = this.props;

    const guidingIndex = this.toChildIndex(guidingChild);
    const interactiveIndex =
      interactiveChild && this.toChildIndex(interactiveChild);
    let childIndex = 0;
    const styledChildren = Children.map(children, child => {
      if (child) {
        const interactive =
          interactiveChild === undefined || interactiveIndex === childIndex;
        let layer;
        if (childIndex === guidingIndex) {
          layer = (
            <StyledStackLayer
              guiding
              fillContainer={fill}
              interactive={interactive}
            >
              {child}
            </StyledStackLayer>
          );
        } else {
          layer = (
            <StyledStackLayer anchor={anchor} interactive={interactive}>
              {child}
            </StyledStackLayer>
          );
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

let StackDoc;
if (process.env.NODE_ENV !== 'production') {
  StackDoc = require('./doc').doc(Stack); // eslint-disable-line global-require
}
const StackWrapper = StackDoc || Stack;

export { StackWrapper as Stack };

/* PropTypes for UXPin Merge */
Stack.propTypes = {
  children: PropTypes.node,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf([
    'none',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  anchor: PropTypes.oneOf([
    'center',
    'left',
    'right',
    'top',
    'bottom',
    'top-left',
    'bottom-left',
    'top-right',
    'bottom-right',
  ]),
  fill: PropTypes.bool,
  guidingChild: PropTypes.oneOf(['0', 'first', 'last']),
  interactiveChild: PropTypes.oneOf(['0', 'first', 'last']),
};

/* Export default for UXPin Merge */
export default Stack;

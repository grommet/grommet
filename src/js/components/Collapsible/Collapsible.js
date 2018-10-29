import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import { withTheme } from '../hocs';
import { Box } from '../Box';

const animatedBoxProperty = direction =>
  direction === 'horizontal' ? 'width' : 'height';

const AnimatedBox = styled(Box)`
  ${props =>
    !props.animate &&
    (props.open
      ? `
    max-${animatedBoxProperty(props.collapsibleDirection)}: unset;
    visibility: visible;
  `
      : `
    max-${animatedBoxProperty(props.collapsibleDirection)}: 0;
    visibility: hidden;
  `)};
`;

class Collapsible extends Component {
  ref = createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open } = nextProps;
    if (open !== prevState.open) {
      return {
        animate: true,
        open,
      };
    }
    return null;
  }

  constructor(props, context) {
    super(props, context);

    /* eslint-disable-next-line react/prop-types */
    this.state = { open: props.open, animate: false };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      /* eslint-disable-next-line react/prop-types */
      direction,
      theme: {
        collapsible: { minSpeed, baseline },
      },
    } = this.props;
    const { animate, open } = this.state;

    /* eslint-disable-next-line react/no-find-dom-node */
    const container = findDOMNode(this.ref.current);
    const dimension = animatedBoxProperty(direction);
    const boudingClientRect = container.getBoundingClientRect();
    const dimensionSize = boudingClientRect[dimension];

    let shouldAnimate = animate && prevState.open !== open;

    if (open && snapshot[dimension] && dimensionSize !== snapshot[dimension]) {
      shouldAnimate = true;
    }

    if (shouldAnimate) {
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }

      const speed = Math.max((dimensionSize / baseline) * minSpeed, minSpeed);

      container.style[`max-${dimension}`] = `${snapshot[dimension]}px`;
      container.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.transition = `max-${dimension} ${speed}ms, visibility 50ms`;
          container.style[`max-${dimension}`] = open
            ? `${dimensionSize}px`
            : '0px';

          this.animationTimeout = setTimeout(() => {
            container.removeAttribute('style');
            this.setState({
              animate: false,
            });
          }, speed);
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  getSnapshotBeforeUpdate = () =>
    /* eslint-disable-next-line react/no-find-dom-node */
    this.ref.current && findDOMNode(this.ref.current).getBoundingClientRect();

  render() {
    /* eslint-disable-next-line react/prop-types */
    const { children, direction } = this.props;
    const { animate, open } = this.state;

    return (
      <AnimatedBox
        aria-hidden={!open}
        ref={this.ref}
        open={open}
        animate={animate}
        collapsibleDirection={direction}
      >
        {children}
      </AnimatedBox>
    );
  }
}

let CollapsibleDoc;
if (process.env.NODE_ENV !== 'production') {
  CollapsibleDoc = require('./doc').doc(Collapsible); // eslint-disable-line global-require
}
const CollapsibleWrapper = compose(withTheme)(CollapsibleDoc || Collapsible);

export { CollapsibleWrapper as Collapsible };

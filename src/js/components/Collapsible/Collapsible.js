import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';

import { withTheme } from '../hocs';

import { Box } from '../Box';

import doc from './doc';

const AnimatedBox = styled(Box)`
  ${props => !props.animate && (props.open ? `
    max-height: unset;
    visibility: visible;
  ` : `
    max-height: 0;
    visibility: hidden;
  `)}
`;

class Collapsible extends Component {
  ref = createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open } = nextProps;
    if (
      open !== prevState.open
    ) {
      return {
        animate: true,
        open,
      };
    }
    return null;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: props.open,
      animate: false,
    };
  }

  getSnapshotBeforeUpdate = () => (
    this.ref.current && findDOMNode(this.ref.current).getBoundingClientRect()
  )

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { theme: { collapsible: { minSpeed, baseHeight } } } = this.props;
    const { animate, open } = this.state;

    const container = findDOMNode(this.ref.current);

    let shouldAnimate = animate && prevState.open !== open;

    if (snapshot.height && container.getBoundingClientRect().height > snapshot.height) {
      shouldAnimate = true;
    }

    if (shouldAnimate) {
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }

      const height = container.clientHeight;
      const speed = Math.max((height / baseHeight) * minSpeed, minSpeed);

      container.style['max-height'] = `${snapshot.height}px`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.transition = `max-height ${speed}ms, visibility 50ms`;
          container.style['max-height'] = open ? `${height}px` : '0px';

          this.animationTimeout = setTimeout(() => {
            container.style = '';
            this.setState(
              {
                animate: false,
              }
            );
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

  render() {
    const {
      children,
    } = this.props;
    const {
      animate,
      open,
    } = this.state;

    return (
      <AnimatedBox
        overflow='hidden'
        aria-hidden={!open}
        ref={this.ref}
        open={open}
        animate={animate}
      >
        {children}
      </AnimatedBox>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Collapsible);
}

export default withTheme(Collapsible);

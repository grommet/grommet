import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Transition from 'react-transition-group/Transition';

import { withTheme } from '../hocs';

import { Box } from '../Box';

import CollapsibleContext from './CollapsibleContext';
import doc from './doc';

const getBaseStyle = (props) => {
  const { theme: { collapsible: { minSpeed, baseHeight } } } = props;
  const baseAnimation = {
    transition: `max-height ${minSpeed}ms, visibility 50ms`,
    visibility: 'hidden',
    overflow: 'hidden',
  };

  const baseTransitionStyles = {
    entering: { visibility: 'hidden', overflow: 'hidden' },
    entered: { visibility: 'visible', overflow: 'unset' },
    exiting: { visibility: 'hidden', overflow: 'unset' },
  };

  return (
  {
    animation: { ...baseAnimation },
    transitionStyles: { ...baseTransitionStyles },
    containerHeight: undefined,
    minSpeed,
    baseHeight,
  }
  );
};

class Collapsible extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    const { theme: { collapsible: { minSpeed, baseHeight } } } = nextProps;
    if (
      minSpeed !== prevState.minSpeed ||
      baseHeight !== prevState.baseHeight
    ) {
      return getBaseStyle(nextProps);
    }
    return null;
  }

  reset = () => {
    const { containerHeight } = this.state;
    // preserve original height
    this.setState({ forceClose: true, previousHeight: containerHeight });
  }

  componentDidUpdate() {
    if (this.state.forceClose) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ forceClose: undefined });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  onEntering = () => {
    const { previousHeight, baseHeight, minSpeed } = this.state;

    const height = findDOMNode(this.animateContainerRef).clientHeight;
    const speed = Math.max((height / baseHeight) * minSpeed, minSpeed);

    const baseStyle = getBaseStyle(this.props);

    this.setState({
      containerHeight: height,
      speed,
      animation: {
        ...baseStyle.animation,
        transition: (
          `max-height ${speed}ms, ${!previousHeight ? ', visibility 50ms' : ''}`
        ),
        maxHeight: 0,
      },
      transitionStyles: {
        ...baseStyle.transitionStyles,
        entering: {
          ...baseStyle.transitionStyles.entering,
          maxHeight: previousHeight || 0,
        },
        entered: {
          ...baseStyle.transitionStyles.entered,
          maxHeight: `${height}px`,
        },
        exiting: {
          ...baseStyle.transitionStyles.exiting,
          maxHeight: 0,
        },
      },
    });
  }

  onEnter = () => {
    this.setState(getBaseStyle(this.props));
  }

  render() {
    const {
      children,
      open,
    } = this.props;
    const {
      animation,
      forceClose,
      previousHeight,
      transitionStyles,
      speed,
    } = this.state;

    return (
      <CollapsibleContext.Provider
        value={{
          reset: this.reset,
        }}
      >
        <Transition
          in={!forceClose && open}
          appear={true}
          timeout={{ enter: 0, exit: !previousHeight ? speed : 0 }}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={() => this.setState({ previousHeight: undefined })}
        >
          {state => (
            <Box
              flex={false}
              aria-hidden={!open}
              ref={(ref) => {
                this.animateContainerRef = ref;
              }}
              style={{
                ...animation,
                ...transitionStyles[state],
              }}
            >
              {state !== 'exited' && children}
            </Box>
          )}
        </Transition>
      </CollapsibleContext.Provider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Collapsible);
}

export default withTheme(Collapsible);

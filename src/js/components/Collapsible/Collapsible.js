import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Transition from 'react-transition-group/Transition';

import { Box } from '../Box';

import CollapsibleContext from './CollapsibleContext';
import doc from './doc';

const BASE_HEIGHT = 500;
const MIN_SPEED = 150;

const baseAnimation = {
  transition: `max-height ${MIN_SPEED}ms, visibility 50ms`,
  visibility: 'hidden',
  overflow: 'hidden',
};

const baseTransitionStyles = {
  entering: { visibility: 'hidden', overflow: 'hidden' },
  entered: { visibility: 'visible', overflow: 'unset' },
  exiting: { visibility: 'hidden', overflow: 'unset' },
};

const getBaseStyle = () => (
  {
    animation: { ...baseAnimation },
    transitionStyles: { ...baseTransitionStyles },
  }
);

class Collapsible extends Component {
  state = getBaseStyle()

  reset = () => {
    // preserve original height
    this.setState({ forceClose: true, previousHeight: this.height });
  }

  componentDidUpdate() {
    if (this.state.forceClose) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ forceClose: undefined });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  onEntering = () => {
    const { previousHeight } = this.state;

    this.height = findDOMNode(this.animateContainerRef).clientHeight;
    this.speed = Math.max((this.height / BASE_HEIGHT) * MIN_SPEED, MIN_SPEED);

    this.setState({
      animation: {
        ...baseAnimation,
        transition: (
          `max-height ${this.speed}ms, ${!previousHeight ? ', visibility 50ms' : ''}`
        ),
        maxHeight: 0,
      },
      transitionStyles: {
        ...baseTransitionStyles,
        entering: {
          ...baseTransitionStyles.entering,
          maxHeight: previousHeight || 0,
        },
        entered: {
          ...baseTransitionStyles.entered,
          maxHeight: `${this.height}px`,
        },
        exiting: {
          ...baseTransitionStyles.exiting,
          maxHeight: 0,
        },
      },
    });
  }

  onEnter = () => this.setState(getBaseStyle())

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
    } = this.state;

    return (
      <CollapsibleContext.Provider
        value={{
          reset: this.reset,
        }}
      >
        <Transition
          in={!forceClose && open}
          timeout={{ enter: 0, exit: !previousHeight ? this.speed : 0 }}
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

export default Collapsible;

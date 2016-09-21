// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

const CLASS_ROOT = 'animate';

class AnimateChild extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      enterClass: '',
      leaveClass: ''
    };
  }

  componentWillAppear (callback) {
    this.enter(callback);
  }

  componentWillEnter (callback) {
    this.enter(callback);
  }

  componentDidAppear () {
    this.entered();
  }

  componentDidEnter () {
    this.entered();
  }

  componentWillLeave (callback) {
    this.leave(callback);
  }

  enter (callback) {
    const {
      enter: {
        animation: enterAnimation,
        delay
      },
      leave: {
        animation: leaveAnimation
      }
    } = this.props;
    const node = ReactDOM.findDOMNode(this);

    const enterClass = enterAnimation;
    const leaveClass = leaveAnimation || enterAnimation;
    this.setState({enterClass});
    this.setState({leaveClass});

    if (node) {
      node.style.transitionDuration = '';
      node.classList.remove('animate', `${leaveClass}--leave`);
      node.classList.add(`${enterClass}--enter`);
      setTimeout(callback, delay || 50);
    }
  }

  entered () {
    const { enter: { duration } } = this.props;
    const node = ReactDOM.findDOMNode(this);
    const enterClass = this.state.enterClass;
    node.classList.remove(`${enterClass}--enter`);
    if (duration) {
      node.style.transitionDuration = `${duration}ms`;
    }
    node.classList.add('animate', `${enterClass}--enter-active`);
    setTimeout(() => {
      node.style.transitionDuration = '';
      node.classList.remove('animate');
    }, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
  }

  leave (callback) {
    const { leave: { duration, delay } } = this.props;
    const node = ReactDOM.findDOMNode(this);

    if (duration) {
      node.style.transitionDuration = `${duration}ms`;
    }

    return setTimeout(() => {
      node.classList.remove(`${this.state.enterClass}--enter-active`);
      node.classList.add('animate', `${this.state.leaveClass}--leave`);
      setTimeout(callback,
        parseFloat(getComputedStyle(node).transitionDuration) * 1000);
    }, delay);
  }

  render () {
    return this.props.children;
  }
};

AnimateChild.propTypes = {
  enter: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  }),
  leave: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  })
};

AnimateChild.defaultProps = {
  enter: {},
  leave: {}
};


class Animate extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      animationState: 'enter',
      animation: props.enter.animation
    };
  }

  componentWillReceiveProps (nextProps) {
    const { visible, keep } = this.props;
    const { animationState } = this.state;

    if (keep && visible !== nextProps.visible) {
      let state = '';
      if (!nextProps.visible) {
        state = (animationState === 'leave') ? 'enter' : 'leave';
      }

      const animateState = nextProps[state] || nextProps.enter;
      this.setState({
        animationState: state,
        animation: state ? animateState.animation : ''
      });

      // Reset animation state back to enter after leave animation is finished
      if (state === 'leave') {
        const node = ReactDOM.findDOMNode(this);
        clearTimeout(this.animationTimer);
        this.animationTimer = setTimeout(() => {
          this.setState({
            animationState: 'enter',
            animation: nextProps.enter.animation
          });
        }, (parseFloat(getComputedStyle(node).transitionDuration) +
        parseFloat(getComputedStyle(node).transitionDelay)) * 1000);
      }
    }
  }

  render () {
    const {
      enter,
      leave,
      className,
      children,
      component,
      visible,
      keep,
      style,
      ...props
    } = this.props;

    const animateChildren = React.Children.map(children, (child, index) => {
      const key = (child && child.key) ? child.key : `animate-${index}`;
      return (
        <AnimateChild
          key={key}
          enter={enter}
          leave={leave}
        >
          {child}
        </AnimateChild>
      );
    });

    let classes = className;
    let styles = {...style};
    if (keep) {
      classes = classnames(
        CLASS_ROOT,
        className,
        {
          [`${this.state.animation}--${this.state.animationState}`]: !visible
        }
      );
      styles = {
        ...style,
        transitionDuration: `${enter.duration}ms`,
        transitionDelay: `${enter.delay}ms`
      };
    }

    return (
      <TransitionGroup
        {...props}
        className={classes}
        component={component || 'div'}
        style={styles}
      >
        {(visible || visible === undefined || keep) &&
          animateChildren
        }
      </TransitionGroup>
    );
  }
};

Animate.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  enter: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  }),
  keep: PropTypes.bool,
  leave: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  }),
  visible: PropTypes.bool
};

export default Animate;

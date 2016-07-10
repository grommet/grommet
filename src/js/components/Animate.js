// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';

const CLASS_ROOT = 'animate';

class AnimateChild extends Component {
  constructor (props) {
    super(props);
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

    node.style.transitionDuration = '';
    node.classList.remove('animate', `${leaveClass}--leave`);
    node.classList.add(`${enterClass}--enter`);
    setTimeout(callback, delay);
  }

  entered () {
    const { enter: { duration } } = this.props;
    const node = ReactDOM.findDOMNode(this);
    const enterClass = this.state.enterClass;
    node.classList.remove(`${enterClass}--enter`);
    if (duration) {
      node.style.transitionDuration = `${duration / 1000}s`;
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
      node.style.transitionDuration = `${duration / 1000}s`;
    }

    return setTimeout(() => {
      node.classList.remove(`${this.state.enterClass}--enter-active`);
      node.classList.add('animate', `${this.state.leaveClass}--leave`);
      setTimeout(callback, parseFloat(getComputedStyle(node).transitionDuration) * 1000);
    }, delay);
  }

  render () {
    const { className, children, component } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className
    );

    const Component = component || 'div';

    return <Component {...this.props} className={classes}>{children}</Component>;
  }
};

AnimateChild.defaultProps = {
  enter: {},
  leave: {}
};


class Animate extends Component {
  render () {
    const {
      enter,
      leave,
      children,
      childComponent,
      component,
      visible,
      ...props
    } = this.props;

    const animateChildren = React.Children.map(children, (child, index) => {
      const key = (child && child.key) ? child.key : `animate-${index}`;
      return (
        <AnimateChild
          component={childComponent}
          key={key}
          enter={enter}
          leave={leave}
        >
          {child}
        </AnimateChild>
      );
    });

    return (
      <TransitionGroup
        {...props}
        component={component}
      >
        {(visible || visible === undefined) &&
          animateChildren
        }
      </TransitionGroup>
    );
  }
};

export default Animate;

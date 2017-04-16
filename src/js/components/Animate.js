import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import { findScrollParents } from '../utils/DOM';

const CLASS_ROOT = CSSClassnames.ANIMATE;

class AnimateChild extends Component {

  constructor(props, context) {
    super(props, context);
    const { enter, leave } = props;
    // leave will reuse enter if leave is not defined
    this.state = {
      enter: enter,
      leave: leave || enter,
      state: 'inactive'
    };
  }

  componentWillReceiveProps (nextProps) {
    const { enter, leave } = nextProps;
    this.setState({ enter: enter, leave: leave || enter });
    if (nextProps.visible !== this.props.visible) {
      const [ nextState, lastState ] = nextProps.visible ?
        [ 'enter', 'active' ] : [ 'leave', 'inactive' ];
      this._delay(nextState, this._done.bind(this, lastState));
    }
  }

  componentWillUnmount () {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
  }

  componentWillAppear (callback) {
    if (true === this.props.visible) {
      this._delay('enter', callback);
    }
  }

  componentWillEnter (callback) {
    if (true === this.props.visible) {
      this._delay('enter', callback);
    }
  }

  componentDidAppear () {
    this._done('active');
  }

  componentDidEnter () {
    this._done('active');
  }

  componentWillLeave (callback) {
    this._delay('leave', callback);
  }

  componentDidLeave (callback) {
    this._done('inactive');
  }

  _delay (state, callback) {
    const { delay } = this.state[state];
    // ensure we start out inactive in case we aren't being kept in the DOM
    if ('enter' === state) {
      this.setState({ state: 'inactive '});
    }
    clearTimeout(this._timer);
    this._timer = setTimeout(this._start.bind(this, state, callback),
      delay || 1);
  }

  _start (state, callback) {
    const { duration } = this.state[state];
    this.setState({ state });
    this._timer = setTimeout(callback, duration);
  }

  _done (state) {
    this.setState({ state });
  }

  render () {
    const { children } = this.props;
    const { enter, leave, state } = this.state;
    const animation = (this.state[state] || this.state.enter).animation;
    const className = classnames(
      `${CLASS_ROOT}__child`,
      `${CLASS_ROOT}__child--${animation}`,
      `${CLASS_ROOT}__child--${state}`
    );
    const duration = ('enter' === state || 'inactive' === state) ?
      enter.duration : leave.duration;
    const style = { transitionDuration: `${duration || 0}ms` };
    return <div className={className} style={style}>{children}</div>;
  }
}

AnimateChild.propTypes = {
  enter: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  }).isRequired,
  leave: PropTypes.shape({
    animation: PropTypes.string,
    duration: PropTypes.number,
    delay: PropTypes.number
  }),
  visible: PropTypes.bool
};

AnimateChild.defaultProps = {
  visible: false
};

export default class Animate extends Component {

  constructor(props, context) {
    super(props, context);
    this._checkScroll = this._checkScroll.bind(this);
    this.state = { visible: true === props.visible };
  }

  componentDidMount () {
    if ('scroll' === this.props.visible) {
      this._listenForScroll();
    }
  }

  componentWillReceiveProps (nextProps) {
    const { visible } = this.props;
    if (visible !== nextProps.visible) {
      if ('scroll' === visible) {
        this._unlistenForScroll();
      } else if ('scroll' === nextProps.visible) {
        this._listenForScroll();
      }
      this.setState({ visible: true === nextProps.visible });
    }
  }

  componentWillUnmount () {
    if ('scroll' === this.props.visible) {
      this._unlistenForScroll();
    }
  }

  _listenForScroll () {
    this._scrollParents = findScrollParents(this);
    this._scrollParents.forEach((scrollParent) => {
      scrollParent.addEventListener('scroll', this._checkScroll);
    });
  }

  _unlistenForScroll () {
    this._scrollParents.forEach((scrollParent) => {
      scrollParent.removeEventListener('scroll', this._checkScroll);
    });
    this._scrollParents = undefined;
  }

  _checkScroll () {
    const group = findDOMNode(this);
    const rect = group.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      if (! this.state.visible) {
        this.setState({ visible: true });
      }
    } else {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  }

  render () {
    const {
      enter, leave, className, children, component, keep, ...props
    } = this.props;
    delete props.visible;
    const { visible } = this.state;

    const classes = classnames( CLASS_ROOT, className );

    let animateChildren;
    if (keep || visible) {
      animateChildren = React.Children.map(children, (child, index) => (
        <AnimateChild key={index} enter={enter} leave={leave}
          visible={visible}>
          {child}
        </AnimateChild>
      ));
    }

    return (
      <TransitionGroup {...props} className={classes} component={component}>
        {animateChildren}
      </TransitionGroup>
    );
  }
}

const ANIMATIONS =
  ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'jiggle'];

Animate.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  enter: PropTypes.shape({
    animation: PropTypes.oneOf(ANIMATIONS).isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number
  }).isRequired,
  keep: PropTypes.bool,
  leave: PropTypes.shape({
    animation: PropTypes.oneOf(ANIMATIONS).isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number
  }),
  visible: PropTypes.oneOfType([
    PropTypes.oneOf(['scroll']),
    PropTypes.bool
  ])
};

Animate.defaultProps = {
  component: 'div',
  enter: { animation: 'fade', duration: 300 },
  visible: true
};

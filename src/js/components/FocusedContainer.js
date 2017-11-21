import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { getBodyChildElements, makeNodeFocusable, makeNodeUnfocusable } from '../utils';

const isNotAncestorOf = child => parent => !parent.contains(child);

export default class FocusedContainer extends Component {
  static defaultProps = {
    hidden: false,
    restrictScroll: false,
  }

  static propTypes = {
    hidden: PropTypes.bool,
    restrictScroll: PropTypes.bool,
  }

  componentDidMount() {
    const { hidden } = this.props;
    if (!hidden) {
      this.trapFocus();
    }
  }

  componentWillReceiveProps({ hidden }) {
    if (hidden !== this.props.hidden) {
      if (!hidden) {
        this.trapFocus();
      } else {
        this.removeTrap();
      }
    }
  }

  componentWillUnmount() {
    this.removeTrap();
  }

  removeTrap = () => {
    const { restrictScroll } = this.props;
    const child = findDOMNode(this.ref);
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeFocusable);
    if (restrictScroll) {
      document.body.style.overflow = 'scroll';
    }
  }

  trapFocus = () => {
    const { restrictScroll } = this.props;
    const child = findDOMNode(this.ref);
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeUnfocusable);

    if (restrictScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <div ref={(ref) => { this.ref = ref; }} onBlur={this.removeTrap} {...rest}>
        {children}
      </div>
    );
  }
}

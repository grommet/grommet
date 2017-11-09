import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { getBodyChildElements, makeNodeFocusable, makeNodeUnfocusable } from '../utils';

const isNotAncestorOf = child => parent => !parent.contains(child);

export default class FocusedContainer extends Component {
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

  onBlur = () => {
    // timeout needed so it gives enough time for activeElement to be updated
    setTimeout(() => {
      const containerNode = findDOMNode(this.ref);
      if (!containerNode.contains(document.activeElement)) {
        this.removeTrap();
      }
    }, 0);
  }

  render() {
    return (
      <div ref={(ref) => { this.ref = ref; }} onBlur={this.removeTrap}>
        {this.props.children}
      </div>
    );
  }
}

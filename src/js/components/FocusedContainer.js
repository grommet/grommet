import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import { getBodyChildElements, makeNodeFocusable, makeNodeUnfocusable } from '../utils';

const isNotAncestorOf = child => parent => !parent.contains(child);

export default class FocusedContainer extends Component {
  componentDidMount() {
    const { restrictScroll } = this.props;
    const child = findDOMNode(this.ref);
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeUnfocusable);

    if (restrictScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    const { restrictScroll } = this.props;
    const child = findDOMNode(this.ref);
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeFocusable);
    if (restrictScroll) {
      document.body.style.overflow = 'scroll';
    }
  }

  render() {
    return <div ref={(ref) => { this.ref = ref; }}>{this.props.children}</div>;
  }
}

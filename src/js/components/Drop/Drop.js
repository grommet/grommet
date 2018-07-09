import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer, setFocusWithoutScroll } from '../../utils';

import { withTheme } from '../hocs';

import DropContainer from './DropContainer';
import doc from './doc';

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
  }

  originalFocusedElement = document.activeElement;
  dropContainer = getNewContainer();

  componentWillUnmount() {
    const { restrictFocus } = this.props;
    if (restrictFocus && this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        setFocusWithoutScroll(this.originalFocusedElement);
      } else if (this.originalFocusedElement.parentNode &&
        this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        setFocusWithoutScroll(this.originalFocusedElement.parentNode);
      }
    }
    document.body.removeChild(this.dropContainer);
  }

  render() {
    const {
      target: dropTarget, // avoid DOM leakage
      ...rest
    } = this.props;
    return createPortal(
      <DropContainer dropTarget={dropTarget} {...rest} />,
      this.dropContainer
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Drop);
}

export default withTheme(Drop);
